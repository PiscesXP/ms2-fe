import { useRequest } from "ahooks";
import { Card, Divider, Spin } from "antd";
import { BackupSelectForm } from "./BackupSelectForm";
import { CenterMe, CenterMeResponsive } from "../../components/layout";
import { Backup } from "./Backup";

export const BackupPage = () => {
  const { data, loading, run } = useRequest(async () => {
    const result = await fetch("http://localhost:23333/mc/backup", {
      credentials: "include",
      mode: "cors",
    });
    return await result.json();
  });

  const refreshBackupList = () => {
    run();
  };

  if (!Array.isArray(data?.backups)) {
    return <Spin />;
  }

  return (
    <CenterMeResponsive>
      <Card title="备份">
        <CenterMe>
          <Backup refreshBackupList={refreshBackupList} />
        </CenterMe>
      </Card>
      <Divider dashed />
      <Card title="恢复">
        <CenterMe>
          <BackupSelectForm
            loading={loading}
            backups={data?.backups}
            refreshBackupList={refreshBackupList}
          />
        </CenterMe>
      </Card>
    </CenterMeResponsive>
  );
};
