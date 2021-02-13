import { Form, Input, Modal } from "antd";
import { useState } from "react";

export const PassportPage = () => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(false);

  const handleSubmit = async () => {
    const result = await fetch("http://localhost:23333/validate", {
      credentials: "include",
      mode: "cors",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(form.getFieldsValue()),
    });
    console.log(result);
  };

  return (
    <Modal visible={visible} onOk={handleSubmit}>
      <Form form={form}>
        <Form.Item label="验证码" name="token" required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
