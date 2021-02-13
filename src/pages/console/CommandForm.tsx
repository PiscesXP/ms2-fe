import { Button, Form, Input } from "antd";
import React from "react";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

interface CommandFormProps {
  loading: boolean;
  onSubmit: (command: string) => void;
}

export const CommandForm: React.FC<CommandFormProps> = ({
  loading,
  onSubmit,
}) => {
  const onFinish = (values: any) => {
    onSubmit(values.command);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      layout="inline"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="命令"
        name="command"
        rules={[
          {
            required: true,
            message: "Please input your command!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" loading={loading} htmlType="submit">
          执行指令
        </Button>
      </Form.Item>
    </Form>
  );
};
