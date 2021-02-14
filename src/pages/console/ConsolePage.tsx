import { Card, Divider, notification } from "antd";
import { CenterMeFlex, CenterMeResponsive } from "../../components/layout";
import { useRequest } from "ahooks";
import { CommandForm } from "./CommandForm";
import { IODisplay } from "./IODisplay";
import { buildUrl } from "../../config/config";

interface FetchData {
  stdout: IODataItem[];
}

export const ConsolePage = () => {
  const { data, loading, run } = useRequest<FetchData>(
    async () => {
      const result = await fetch(buildUrl("/mc/stdout"), {
        credentials: "include",
        mode: "cors",
      });
      return await result.json();
    },
    {
      throwOnError: true,
      formatResult: (result) => {
        result.stdout.forEach((value) => {
          value.time = new Date(value.time);
        });
        result.stdout.sort((a, b) => {
          return +b.time - +a.time;
        });
        return result;
      },
      pollingInterval: 30000,
      pollingWhenHidden: false,
    }
  );

  //submit command
  const submit = useRequest(
    async (command: string) => {
      const result = await fetch(buildUrl("/mc/stdin"), {
        credentials: "include",
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          stdin: command,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      return await result.json();
    },
    {
      manual: true,
      onSuccess: () => {
        notification.success({
          message: "命令发送成功",
        });
        //polling for 10s
        for (let i = 1; i < 5; i++) {
          setTimeout(() => {
            run();
          }, 2000 * i);
        }
      },
    }
  );

  const handleSubmitCommand = (command: string) => {
    submit.run(command);
  };

  return (
    <CenterMeResponsive>
      <Card title="控制台">
        <CenterMeFlex>
          <CommandForm
            loading={loading || submit.loading}
            onSubmit={handleSubmitCommand}
          />
        </CenterMeFlex>
        <Divider dashed />
        <IODisplay loading={loading} data={data?.stdout} />
      </Card>
    </CenterMeResponsive>
  );
};

export enum IOType {
  stdin = "stdin",
  stdout = "stdout",
  stderr = "stderr",
}

export type IODataItem = {
  index: number;
  type: IOType;
  data: string;
  time: Date;
};
