import defVart from "./glsl/default.vert";
import defFrag from "./glsl/default.frag";
import fitCanvas from './util/fitCanvas';
import GLUtility from './util/GLUtility';

const SCREEN_WIDTH = 500;
const SCREEN_HEIGHT = 500;

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;
fitCanvas(canvas, SCREEN_WIDTH, SCREEN_HEIGHT);

const gl = canvas.getContext('webgl');
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

const vartShader = GLUtility.createShader(gl, gl.VERTEX_SHADER, defVart);
const fragShader = GLUtility.createShader(gl, gl.FRAGMENT_SHADER, defFrag);
const program = GLUtility.createProgram(gl, vartShader, fragShader);

const position = [
  -0.9,  0.9,
   0.9,  0.9,
  -0.9, -0.9,
   0.9, -0.9,
];

const index = [
  0, 1, 2,
  1, 2, 3
];

const positionLocation = gl.getAttribLocation(program, 'position');
const positionStride = 2;

gl.bindBuffer(gl.ARRAY_BUFFER, GLUtility.createVBO(gl, position));
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, positionStride, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, GLUtility.createIBO(gl, index));
gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);

