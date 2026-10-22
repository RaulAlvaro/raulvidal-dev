// Hero backdrop: a dark, grainy surface that drifts slowly like still water, on its own clock
// (it does not react to scrolling). One fragment shader on a full-screen triangle; no dependencies.

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision mediump float;
uniform vec2 resolution;
uniform float time;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = (gl_FragCoord.xy - 0.5 * resolution) / resolution.y * 1.4;

  // A slow clock and a gentle warp keep the surface calm: broad swells, no churn.
  float t = time * 0.018;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  float surface = fbm(p + 1.8 * q + vec2(t * 0.5, -t * 0.3));

  // Soft light bands where the surface folds.
  float bands = pow(1.0 - abs(sin(surface * 7.0 + t * 1.5)), 12.0);

  vec3 ground = vec3(0.031);
  vec3 sheen = vec3(0.066, 0.062, 0.058) * smoothstep(0.35, 0.85, surface);
  vec3 light = vec3(0.96, 0.65, 0.14) * bands * 0.03;

  // Vignette keeps the edges in the page's black so the screenshot stays the subject.
  float vignette = smoothstep(1.25, 0.25, length(uv - vec2(0.62, 0.5)));

  float grain = (hash(gl_FragCoord.xy + fract(time * 0.5) * 97.0) - 0.5) * 0.04;

  vec3 color = ground + (sheen + light) * vignette + grain;
  gl_FragColor = vec4(color, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? 'shader compile failed');
  }
  return shader;
}

export function createWater(canvas: HTMLCanvasElement, { reducedMotion }: { reducedMotion: boolean }) {
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
  if (!gl) return;

  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  gl.useProgram(program);

  // One oversized triangle covers the viewport.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uResolution = gl.getUniformLocation(program, 'resolution');
  const uTime = gl.getUniformLocation(program, 'time');

  // Grain needs real pixels, but full retina resolution is wasted on a soft surface.
  const scale = Math.min(window.devicePixelRatio, 1.5);
  const start = performance.now();
  const draw = () => {
    gl.uniform1f(uTime, (performance.now() - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const resize = () => {
    canvas.width = Math.round(canvas.clientWidth * scale);
    canvas.height = Math.round(canvas.clientHeight * scale);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uResolution, canvas.width, canvas.height);
    draw();
  };
  resize();
  new ResizeObserver(resize).observe(canvas);

  if (reducedMotion) return;

  // Only animate while the canvas is on screen and the tab is visible.
  let onScreen = true;
  let frame = 0;
  const loop = () => {
    draw();
    frame = onScreen && !document.hidden ? requestAnimationFrame(loop) : 0;
  };
  const wake = () => {
    if (onScreen && !document.hidden && !frame) frame = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    wake();
  }).observe(canvas);
  document.addEventListener('visibilitychange', wake);
  wake();
}
