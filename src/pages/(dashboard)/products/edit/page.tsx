import instance from "@/configs/axios";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query";
import { Button, Checkbox, Form, FormProps, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  countInStock?: number;
  image?: string;
  featured?: boolean;
  discount?: number;
  // "name": "Product 1",
  // "price": 100000,
  // "image": "https://picsum.photos/id/10/300/300",
  // "description": "This is product 1",
  // "discount": 30,
  // "quantity": 100,
  // "featured": true
};


const ProductEditPage = () => {
  const {id} = useParams()
  const queryClient = useQueryClient()
  const [messageApi, contextHolder] = message.useMessage()
  const {data,isLoading,isError,error} = useQuery({
    queryKey: ["products",id],
    queryFn: async () =>{
      try {
        return await instance.get(`/products/${id}`)
      } catch (error) {
        throw new Error("khong lay duoc sp tu api")
      }
    }
  })
  const {mutate} = useMutation({
    mutationFn: async(formData:FieldType) =>{
      try {
        return await instance.put(`/products/${id}`,formData)
      } catch (error) {
        throw new Error("Update sp that bai")
      }
    },
    onSuccess: ()=>{
      messageApi.open({
        type: "success",
        content: "Update  thanh cong"
      })
      queryClient.invalidateQueries({
        queryKey: ['products']
      })
    },
    onError: (error)=>{
      messageApi.open({
        type: "error",
        content: error.message
      })
    }
  })
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values)
  };
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>{error.message}</div>
  
  return (
    <>
    {contextHolder}
    <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Update san pham</h1>
                <Button type="primary">
                    <Link to={"/admin/products"}>
                        <BackwardFilled />
                        Quay lai
                    </Link>
                </Button>
            </div>
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ ...data?.data}}
    onFinish={onFinish}
  >
    <Form.Item<FieldType>
      label="Ten sp"
      name="name"
      rules={[{ required: true, message: 'Ten sp la bat buoc' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Gia sp"
      name="price"
      rules={[{ required: true, message: 'Gia sp la bat buoc' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="So luong sp"
      name="countInStock"
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="Anh luong sp"
      name="image"
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Mo ta sp"
      name="description"
    >
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item<FieldType>
      name="featured"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Sp noi bat ?</Checkbox>
    </Form.Item>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </>
  )
}

export default ProductEditPage