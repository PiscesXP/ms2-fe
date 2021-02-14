import React from "react";
import { Button, Form, Modal } from "antd";
import { useRequest } from "ahooks";

interface BackupSelectFormProps {
  refreshBackupList: () => void;
}

export const Backup: React.FC<BackupSelectFormProps> = ({
  refreshBackupList,
}) => {
  const [form] = Form.useForm();

  const backupRequest = useRequest(
    async () => {
      const result = await fetch("http://localhost:23333/mc/backup", {
        credentials: "include",
        mode: "cors",
        method: "POST",
      });
      return await result.json();
    },
    {
      manual: true,
    }
  );

  const handleBackup = async () => {
    const result = await backupRequest.run();
    if (result?.result === "ok") {
      Modal.success({
        title: "备份成功",
        content: "存档已成功备份,请等待服务器重新启动.",
        centered: true,
      });
    }
    refreshBackupList();
  };

  return (
    <Form
      form={form}
      onFinish={handleBackup}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">
          备份当前存档
        </Button>
      </Form.Item>
    </Form>
  );
};
