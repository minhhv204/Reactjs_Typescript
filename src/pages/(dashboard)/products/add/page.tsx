import instance from "@/configs/axios";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQuery,  } from "@tanstack/react-query";
import { Button, Checkbox, Form, FormProps, Input, message, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link } from "react-router-dom";

type FieldType = {
  name?: string;
  price?: number;
  description?: string;
  countInStock?: number;
  image?: string;
  featured?: boolean;
  discount: number;
  category: string;
  // "name": "Product 1",
  // "price": 100000,
  // "image": "https://picsum.photos/id/10/300/300",
  // "description": "This is product 1",
  // "discount": 30,
  // "quantity": 100,
  // "featured": true
};


const ProductAddPage = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()
  const {data:categories} = useQuery({
    queryKey: ["categories"],
    queryFn: ()=>instance.get(`/category`)
  })
  console.log(categories);
  const {mutate} = useMutation({
    mutationFn: async(formData:FieldType) =>{
      try {
        return await instance.post(`/products`,formData)
      } catch (error) {
        throw new Error("Them sp that bai")
      }
    },
    onSuccess: ()=>{
      messageApi.open({
        type: "success",
        content: "Them thanh cong"
      })
      form.resetFields()
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
  return (
    <>
    {contextHolder}
    <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl font-semibold">Them san pham</h1>
                <Button type="primary">
                    <Link to={"/admin/products"}>
                        <BackwardFilled />
                        Quay lai
                    </Link>
                </Button>
            </div>
    <Form
    form={form}
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
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
                        label="Danh mục"
                        name="category"
                        rules={[{ required: true, message: "Bắt buộc chọn danh mục!" }]}
                    >
                        <Select
                            showSearch
                            placeholder="Chọn danh mục"
                            optionFilterProp="label"
                            options={categories?.data.map((category: any) => ({
                                value: category._id,
                                label: category.name,
                            }))}
                        />
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

export default ProductAddPage