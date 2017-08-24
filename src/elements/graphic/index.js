export class Graphic {

  x0 = 40;
  y0 = 40;

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
  }

  renderAxisX() {
    this.context.beginPath();
    this.context.moveTo(this.x0, this.canvasHeight - this.y0);
    this.context.lineTo(this.canvasWidth - this.x0, this.canvasHeight - this.y0);
    this.context.stroke();
    this.context.closePath();
  }

  renderAxisY() {
    this.context.beginPath();
    this.context.moveTo(this.x0, this.y0);
    this.context.lineTo(this.x0, this.canvasHeight - this.y0);
    this.context.stroke();
    this.context.closePath();
  }

  clear() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  renderGraphic(data, min, max) {
    const graphicWidth = this.canvasWidth - this.x0 * 2;
    const graphicHeight = this.canvasHeight - this.y0 * 2;

    const stepX = graphicWidth / data.length;
    const stepY = graphicHeight / (Math.abs(min) + Math.abs(max));

    this.context.beginPath();
    for (let [index, value] of data.entries()) {
      let x = this.x0 + index * stepX;

      value = value > 0 ? value + Math.abs(min) : Math.abs(min) + value;

      let y = this.y0 + graphicHeight - Math.abs(value * stepY);
      y = Math.round(y);
      x = Math.round(x);

      if (0 === index)
        this.context.moveTo(x, y);
      else
        this.context.lineTo(x, y);

      // this.context.arc(x, y, 2, 0, 2 * Math.PI, false);
    }
    this.context.stroke();
    this.context.closePath();
  }
}
