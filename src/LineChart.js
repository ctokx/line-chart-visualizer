export class LineChart {
  constructor({
    canvas,
    fontSize = "16px",
    fontFamily = "Arial",
    showGrid = true,
    showXAxisLabel = true,
    showYAxisLabel = true,
    showXAxisValues = true,
    showYAxisValues = true,
    showAnnotations = true,
    title = "",
    xlabel = "",
    ylabel = "",
  }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.dataSets = [];
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.showGrid = showGrid;
    this.showXAxisLabel = showXAxisLabel;
    this.showYAxisLabel = showYAxisLabel;
    this.showXAxisValues = showXAxisValues;
    this.showYAxisValues = showYAxisValues;
    this.showAnnotations = showAnnotations;
    this.title = title;
    this.xlabel = xlabel;
    this.ylabel = ylabel;
    this.padding = 60;
    this.fillAreas = [];
  }

  addDataSet({ xData, yData, color, name }) {
    this.dataSets.push({ xData, yData, color, name });
  }

  addFillBetween({ index1, index2, color }) {
    if (index1 < this.dataSets.length && index2 < this.dataSets.length) {
      this.fillAreas.push({ index1, index2, color });
    }
  }

  getX(value) {
    const allXData = this.dataSets.flatMap((dataSet) => dataSet.xData);
    const minX = Math.min(...allXData);
    const maxX = Math.max(...allXData);
    const range = maxX - minX;
    const scale = (this.canvas.width - 2 * this.padding) / range;
    return (value - minX) * scale + this.padding;
  }

  getY(value) {
    const allYData = this.dataSets.flatMap((dataSet) => dataSet.yData);
    const minY = Math.min(...allYData);
    const maxY = Math.max(...allYData);
    const range = maxY - minY;
    const scale = (this.canvas.height - 2 * this.padding) / range;
    return this.canvas.height - (value - minY) * scale - this.padding;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.dataSets.length === 0) return;

    this.ctx.font = `${this.fontSize} ${this.fontFamily}`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "top";
    this.ctx.fillText(this.title, this.canvas.width / 2, this.padding / 2);

    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(
      this.xlabel,
      this.canvas.width / 2,
      this.canvas.height - this.padding / 4
    );

    this.ctx.save();
    this.ctx.translate(this.padding / 2, this.canvas.height / 2);
    this.ctx.rotate(-Math.PI / 2);
    this.ctx.fillText(this.ylabel, 0, 0);
    this.ctx.restore();

    this.fillAreas.forEach(({ index1, index2, color }) => {
      const dataSet1 = this.dataSets[index1];
      const dataSet2 = this.dataSets[index2];
      this.ctx.fillStyle = color;

      this.ctx.beginPath();
      dataSet1.xData.forEach((x, i) => {
        const y1 = this.getY(dataSet1.yData[i]);
        const y2 = this.getY(dataSet2.yData[i]);
        const xVal = this.getX(x);

        if (i === 0) {
          this.ctx.moveTo(xVal, y1);
        } else {
          this.ctx.lineTo(xVal, y1);
        }
        if (i === dataSet1.xData.length - 1) {
          for (let j = dataSet2.xData.length - 1; j >= 0; j--) {
            this.ctx.lineTo(
              this.getX(dataSet2.xData[j]),
              this.getY(dataSet2.yData[j])
            );
          }
        }
      });
      this.ctx.closePath();
      this.ctx.fill();
    });

    this.dataSets.forEach(({ xData, yData, color }) => {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();

      xData.forEach((x, index) => {
        const xVal = this.getX(x);
        const yVal = this.getY(yData[index]);

        if (index === 0) {
          this.ctx.moveTo(xVal, yVal);
        } else {
          this.ctx.lineTo(xVal, yVal);
        }
        if (this.showAnnotations) {
          this.ctx.fillStyle = color;
          this.ctx.fillText(`(${x}, ${yData[index]})`, xVal, yVal - 10);
        }
      });

      this.ctx.stroke();
    });

    const allXData = this.dataSets.flatMap((dataSet) => dataSet.xData);
    const allYData = this.dataSets.flatMap((dataSet) => dataSet.yData);
    const maxXValue = Math.max(...allXData);
    const maxYValue = Math.max(...allYData);

    if (this.showGrid) {
      this.drawGrid(maxXValue, maxYValue);
    }
  }

  drawGrid(maxXValue, maxYValue) {
    this.ctx.strokeStyle = "#ddd";
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= maxXValue; i++) {
      const x = this.getX(i);
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.padding);
      this.ctx.lineTo(x, this.canvas.height - this.padding);
      this.ctx.stroke();
      if (this.showXAxisValues) {
        this.ctx.fillText(
          i.toString(),
          x,
          this.canvas.height - this.padding / 1.4
        );
      }
    }

    for (let i = 0; i <= maxYValue; i++) {
      const y = this.getY(i);
      this.ctx.beginPath();
      this.ctx.moveTo(this.padding, y);
      this.ctx.lineTo(this.canvas.width - this.padding, y);
      this.ctx.stroke();
      if (this.showYAxisValues) {
        this.ctx.fillText(i.toString(), this.padding / 1.5, y);
      }
    }
  }
}
