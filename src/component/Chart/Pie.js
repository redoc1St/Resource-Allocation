import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";

export default function PieChart(dataBU) {
  // const data = [
  //   {
  //     type: "BU 1",
  //     value: 27,
  //   },
  //   {
  //     type: "BU 2",
  //     value: 25,
  //   },
  //   {
  //     type: "BU 3",
  //     value: 18,
  //   },
  //   {
  //     type: "BU 4",
  //     value: 15 ,
  //   },
  //   {
  //     type: "BU 5",
  //     value: 10,
  //   },
  //   {
  //     type: "BU 6",
  //     value: 5,
  //   },
  // ];
  let Buid = 1;
  const data = dataBU.data.map((item) => ({
    type: "BU " + Buid++,
    value: item,
    
  }));
  console.log(dataBU.data);
  const config = {
    appendPadding: 5,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      // type: "inner",
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
