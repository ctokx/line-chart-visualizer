# line-chart-visualizer

line-chart-visualizer is a flexible and easy-to-use React chart library for rendering line charts, developed by Varol Cagdas Tok. It allows for extensive customization, including grid display, axis labels, annotations, and filling areas between lines with color.

## Features

- Customizable line colors and names
- Optional grid display
- Configurable axis labels and values
- Annotations for data points
- Filling between specified datasets with color
- Responsive design with automatic resizing

## Installation

To use line-chart-visualizer in your project, include it in your React application by importing the necessary components:

```bash
npm install line-chart-visualizer
```

## Usage

Import `ReactLineChart` from line-chart-visualizer in your React component:

```jsx
import ReactLineChart from "line-chart-visualizer"; // Adjust based on actual package export
```

Define your datasets and optional fill areas between lines, then render the `ReactLineChart` component:

```jsx
import React from "react";
import ReactLineChart from "line-chart-visualizer/react";

function App() {
  const dataSets = [
    {
      xData: [0, 1, 2, 3, 4],
      yData: [0, 2, 4, 6, 8],
      color: "red",
      name: "Dataset 1",
    },
    {
      xData: [0, 1, 2, 3, 4],
      yData: [1, 3, 5, 7, 9],
      color: "blue",
      name: "Dataset 2",
    },
  ];

  const fillAreas = [
    {
      index1: 0,
      index2: 1,
      color: "rgba(255, 0, 0, 0.5)",
    },
  ];

  return (
    <div style={{ width: "800px", height: "600px" }}>
      <ReactLineChart dataSets={dataSets} fillAreas={fillAreas} />
    </div>
  );
}

export default App;
```

## Configuration

The `LineChart` constructor and `ReactLineChart` component support several configuration options:

- `fontSize`: Font size for the chart text
- `fontFamily`: Font family for the chart text
- `showGrid`: Whether to display grid lines
- `showXAxisLabel`: Whether to show the X-axis label
- `showYAxisLabel`: Whether to show the Y-axis label
- `showXAxisValues`: Whether to display values along the X-axis
- `showYAxisValues`: Whether to display values along the Y-axis
- `showAnnotations`: Whether to display annotations on data points
- `title`: Chart title
- `xlabel`: Label for the X-axis
- `ylabel`: Label for the Y-axis
- `fillBetweenLines`: Whether to enable filling between lines

To fill between lines, use the `addFillBetween` method with the following parameters:

- `index1`: Index of the first dataset
- `index2`: Index of the second dataset
- `color`: Fill color

## License

This project is licensed under the MIT License - see the LICENSE file for details.
