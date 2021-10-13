"use strict";

let canvas;
let ctx;
let t; // fraction used in lerp
let color; // color of the shape

function init() {
  canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    ctx = canvas.getContext("2d");
  }
  t = 0;
  color = "black";
  reset();
  drawShape(color);
}

// Clears canvas and resets transformation
function reset() {
  ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transformation matrix
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
}

// Updates to next frame
function update(expr) {
  reset();
  switch (expr) {
    case 1:
      transformT1();
      break;
    case 2:
      transformT2();
      break;
    case 3:
      transformT3();
      break;
    case 4:
      transformT4();
      break;
    default:
      drawShape(color);
      break;
  }
  drawShape(color);
  t += 0.005;
  if (t.toFixed(2) <= 1) {
    requestAnimationFrame(function () {
      update(expr);
    });
  } else {
    t = 0;
  }
}

//
function transformT1() {
  ctx.rotate((lerp(0, -90, t) * Math.PI) / 180);
  ctx.scale(1 - lerp(0, 1.5, t), 1 - lerp(0, 0.5, t));
  color = "red";
}

function transformT2() {
  ctx.translate(lerp(0, 600, t), lerp(0, 200, t));
  ctx.scale(1 - lerp(0, 1.25, t), 1 - lerp(0, 0.75, t));
  color = "green";
}

function transformT3() {
  ctx.translate(lerp(0, 800, t), lerp(0, 400, t));
  ctx.rotate((lerp(0, 90, t) * Math.PI) / 180);
  ctx.scale(1 - lerp(0, 0.5, t), 1 - lerp(0, 0.5, t));
  color = "blue";
}

function transformT4() {
  ctx.translate(0, lerp(0, 400, t));
  ctx.scale(1 - lerp(0, 0.5, t), 1 - lerp(0, 0.5, t));
  color = "purple";
}

function drawShape(color) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(150, 0);
  ctx.lineTo(150, 500);
  ctx.lineTo(800, 500);
  ctx.lineTo(800, 800);
  ctx.lineTo(0, 800);
  ctx.fillStyle = color;
  ctx.fill();
}

function lerp(min, max, fraction) {
  return (max - min) * fraction + min;
}
