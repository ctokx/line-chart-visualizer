import React, { useEffect, useRef } from "react";
import { LineChart } from "./LineChart"; 

const ReactLineChart = ({ dataSets, fillAreas }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (!chartRef.current) {
        chartRef.current = new LineChart({
          canvas: canvasRef.current,
          fontSize: "12px",
          fontFamily: "Arial",
          showGrid: true,
          showXAxisLabel: true,
          showYAxisLabel: true,
          showXAxisValues: true,
          showYAxisValues: true,
          showAnnotations: true,
          title: "My Line Chart",
          xlabel: "X-axis",
          ylabel: "Y-axis",
        });
      }

      const chart = chartRef.current;
      chart.dataSets = [];
      dataSets.forEach((dataSet) => chart.addDataSet(dataSet));

      if (fillAreas) {
        fillAreas.forEach(({ index1, index2, color }) => {
          chart.addFillBetween({ index1, index2, color });
        });
      }

      chart.draw();

      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          canvasRef.current.width = width;
          canvasRef.current.height = height;
          chart.draw();
        }
      });

      observer.observe(canvasRef.current);

      return () => observer.disconnect();
    }
  }, [dataSets, fillAreas]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
};

export default ReactLineChart;
