import React from "react";
import { Pie } from "@ant-design/plots";

export default function PieChart(dataBU) {
  let Buid = 1;
  const data = dataBU.data.map(
    (item) =>
      item >
      0 ? ({
        type: "BU " + Buid++,
        value: item,
      }) :''
  );
  const config = {
    appendPadding: 5,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
      },
    },

    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie style={{ height: "160px" }} {...config} />;
}
