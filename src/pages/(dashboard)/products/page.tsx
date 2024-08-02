import { IProduct } from "@/common/types/product";
import instance from "@/configs/axios";
import { PlusCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, message, Popconfirm, Table } from "antd";
import { render } from "react-dom";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            try {
                return await instance.get(`/products`);
            } catch (error) {
                throw new Error("Call api that bai");
            }
        },
    });
    const {mutate} = useMutation({
      mutationFn: async (id: number | string) =>{
        try {
          return await instance.delete(`/products/${id}`)
        } catch (error) {
          throw new Error("Xoa that bai")
        }
        
      },
      onSuccess: ()=>{
        messageApi.open({
          type: "success",
          content: "Xoa thanh cong"
        })
        queryClient.invalidateQueries({
          queryKey: ["products"]
        })
      },
    

      onError: ()=>{
        messageApi.open({
          type: "success",
          content: error?.message
        })
      }
    })
    const dataSource = data?.data?.data.map((item: IProduct) => ({
        key: item._id,
        ...item,
    }));

    const columns = [
        {
            key: "name",
            title: "Ten san pham",
            dataIndex: "name",
        },
        {
            key: "price",
            title: "Gia san pham",
            dataIndex: "name",
        },
        {
            key: "discount",
            title: "Gia km san pham",
            dataIndex: "discount",
        },
        {
            key: "image",
            title: "Anh san pham",
            dataIndex: "image",
            render: (text: string) => (
                <img
                    src={text}
                    alt="Product"
                    style={{ width: 100, height: 100 }}
                />
            ),
        },
        {
            key: "countInStock",
            title: "So luong san pham",
            dataIndex: "countInStock",
        },
        {
            key: "featured",
            dataIndex: "featured",
            title: "Nổi bật",
            render: (_: any, product: IProduct) => (
                <span>{product.featured ? "Có" : "không"}</span>
            ),
        },
        {
            key: "action",
            render: (_: any, product: IProduct) => {
                return (
                  <>
                  
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={()=>mutate(product._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                    <Button type="primary"><Link to={`/admin/products/${product._id}/edit`}>Update</Link></Button>
                    </>
                );
            },
        },
    ];
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.message}</div>;
    return (
        <>
        {contextHolder}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Quan ly san pham</h1>
                <Button type="primary">
                    <Link to={"/admin/products/add"}>
                        <PlusCircleFilled />
                        Them san pham
                    </Link>
                </Button>
            </div>
            <Table dataSource={dataSource} columns={columns} />;
        </>
    );
};
export default ProductsPage;
