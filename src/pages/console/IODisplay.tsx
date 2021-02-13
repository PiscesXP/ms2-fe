import { Spin, Timeline, Tooltip } from "antd";
import React, { ReactNode } from "react";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { IODataItem, IOType } from "./ConsolePage";
import { dateToText } from "../../util/time";

interface IODisplayProps {
  loading: boolean;
  data: IODataItem[] | undefined;
}

export const IODisplay: React.FC<IODisplayProps> = ({ loading, data }) => {
  if (data === undefined) {
    return <Spin />;
  }
  return (
    <Timeline>
      {data.map((value) => {
        let dot: ReactNode, color: string;
        switch (value.type) {
          case IOType.stdout:
            dot = <ArrowRightOutlined />;
            color = "blue";
            break;
          case IOType.stdin:
            dot = <ArrowLeftOutlined />;
            color = "green";
            break;
          default:
            dot = <CloseCircleOutlined />;
            color = "red";
        }
        return (
          <Timeline.Item key={value.index} dot={dot} color={color}>
            <Tooltip
              placement="topLeft"
              title={`${value.type} ${dateToText(value.time)}`}
              color={color}
            >
              <span>{value.data}</span>
            </Tooltip>
          </Timeline.Item>
        );
      })}
    </Timeline>
  );
};
