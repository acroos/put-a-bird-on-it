import React from "react";
import "./BirdCanvas.css";

class BirdCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();

    this.state = {
      lastPoint: null,
      color: "black",
    };

    this.startDrawing = this.startDrawing.bind(this);
    this.continueDrawing = this.continueDrawing.bind(this);
    this.endDrawing = this.endDrawing.bind(this);
    this.redraw = this.redraw.bind(this);
    this.drawNext = this.drawNext.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.save = this.save.bind(this);
    this.clear = this.clear.bind(this);
  }

  startDrawing(event) {
    const xPoint = event.pageX - this.canvasRef.current.offsetLeft;
    const yPoint = event.pageY - this.canvasRef.current.offsetTop;

    this.setState({
      lastPoint: { x: xPoint, y: yPoint, color: this.state.color },
    });
  }

  continueDrawing(event) {
    if (!this.state.lastPoint) {
      return;
    }

    const xPoint = event.pageX - this.canvasRef.current.offsetLeft;
    const yPoint = event.pageY - this.canvasRef.current.offsetTop;

    this.drawNext(xPoint, yPoint);
  }

  endDrawing() {
    this.setState({ lastPoint: null });
  }

  drawNext(x, y) {
    const { lastPoint } = this.state;

    let context = this.canvasRef.current.getContext("2d");
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.strokeStyle = lastPoint.color;
    context.beginPath();
    context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.closePath();
    context.stroke();

    this.setState({ lastPoint: { x: x, y: y, color: this.state.color } });
  }

  redraw() {
    let { points } = this.state;

    let context = this.canvasRef.current.getContext("2d");
    context.lineJoin = "round";
    context.lineWidth = 5;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (let i = 0; i < points.length; i++) {
      context.strokeStyle = points[i].color;
      context.beginPath();
      if (points[i].start) {
        context.moveTo(points[i].x - 1, points[i].y);
      } else {
        context.moveTo(points[i - 1].x, points[i - 1].y);
      }

      context.lineTo(points[i].x, points[i].y);
      context.closePath();
      context.stroke();
    }
  }

  changeColor(colorCode) {
    this.setState({ color: colorCode });
  }

  save(event) {
    const link = event.target;
    const canvas = this.canvasRef.current;

    link.href = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
  }

  clear() {
    let context = this.canvasRef.current.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    this.setState({
      color: "black",
      lastPoint: null,
    });
  }

  render() {
    return (
      <div className="CanvasContainer">
        <div className="BirdToolbar">
          <a
            className="BirdLink"
            href="#"
            download="Bird.png"
            onClick={this.save}
          >
            Save
          </a>
          <a className="BirdLink" href="#" onClick={this.clear}>
            Clear
          </a>
        </div>
        <canvas
          className="BirdCanvas"
          id="birdCanvas"
          width="800"
          height="600"
          ref={this.canvasRef}
          onMouseDown={this.startDrawing}
          onMouseMove={this.continueDrawing}
          onMouseUp={this.endDrawing}
          onMouseLeave={this.endDrawing}
        ></canvas>
        <div className="BirdColorPalette">
          <h3>Colors</h3>
          <div
            className="BirdColorOption Red"
            onClick={() => this.changeColor("red")}
          ></div>
          <div
            className="BirdColorOption Orange"
            onClick={() => this.changeColor("orange")}
          ></div>
          <div
            className="BirdColorOption Yellow"
            onClick={() => this.changeColor("yellow")}
          ></div>
          <div
            className="BirdColorOption Green"
            onClick={() => this.changeColor("green")}
          ></div>
          <div
            className="BirdColorOption Blue"
            onClick={() => this.changeColor("blue")}
          ></div>
          <div
            className="BirdColorOption Indigo"
            onClick={() => this.changeColor("indigo")}
          ></div>
          <div
            className="BirdColorOption Violet"
            onClick={() => this.changeColor("violet")}
          ></div>
          <div
            className="BirdColorOption Black"
            onClick={() => this.changeColor("black")}
          ></div>
        </div>
      </div>
    );
  }
}

export default BirdCanvas;
