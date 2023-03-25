import React from "react";
import "./canvas.scss";

function Canvas() {
  return (
    <div className="canvas">
      <canvas className="canvas__gtx" width={600} height={400}></canvas>
    </div>
  );
}

export default Canvas;
