import { Form, Input, Modal } from "antd";
import { useState } from "react";
import { useRequest } from "ahooks";
import { buildUrl } from "./config/config";

interface AuthenticationModalProps {
  onAuthSuccess: () => void;
}

export const AuthenticationModal: React.FC<AuthenticationModalProps> = ({
  onAuthSuccess,
}) => {
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(true);

  const { run, loading } = useRequest(
    async () => {
      const result = await fetch(buildUrl("/validate"), {
        credentials: "include",
        mode: "cors",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(form.getFieldsValue()),
      });
      return await result.json();
    },
    {
      onSuccess: (data) => {
        if (data.result === "ok") {
          setVisible(false);
          onAuthSuccess();
        }
      },
      manual: true,
    }
  );

  const handleSubmit = async () => {
    await run();
  };

  return (
    <Modal
      title="身份验证"
      confirmLoading={loading}
      centered={true}
      closable={false}
      visible={visible}
      onOk={handleSubmit}
    >
      <Form form={form}>
        <Form.Item label="验证码" name="token" required>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
