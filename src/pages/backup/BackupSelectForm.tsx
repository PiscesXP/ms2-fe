import React from "react";
import { Button, Form, Modal, Select } from "antd";
import { useRequest } from "ahooks";
import { buildUrl } from "../../config/config";

interface BackupSelectFormProps {
  loading: boolean;
  backups: string[];
  refreshBackupList: () => void;
}

export const BackupSelectForm: React.FC<BackupSelectFormProps> = ({
  loading,
  backups,
  refreshBackupList,
}) => {
  const [form] = Form.useForm();

  const rollbackRequest = useRequest(
    async (backupName: string) => {
      const result = await fetch(buildUrl("/mc/rollback"), {
        credentials: "include",
        mode: "cors",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ backupName }),
      });
      return await result.json();
    },
    {
      manual: true,
    }
  );

  const handleRollback = async (values: any) => {
    const result = await rollbackRequest.run(values);
    if (result?.result === "ok") {
      Modal.success({
        title: "恢复成功",
        content: "存档已恢复,请等待服务器重新启动.",
        centered: true,
      });
    }
    refreshBackupList();
  };

  return (
    <Form
      form={form}
      onFinish={handleRollback}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item label="选择版本" name="version" required>
        <Select loading={loading}>
          {backups.map((value) => (
            <Select.Option value={value}>{value}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
        <Button type="primary" htmlType="submit">
          恢复所选存档
        </Button>
      </Form.Item>
    </Form>
  );
};
