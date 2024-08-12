import { MathUtils, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { getDistortionShaderDefinition } from "./shader/distortion";

const horizontalFov = 140;
const strength = 1;
const cylindricalRatio = 2;

export const initComposer = (renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) => {
  const effect = new ShaderPass(getDistortionShaderDefinition());
  const composer = new EffectComposer(renderer);

  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(effect);

  effect.renderToScreen = true;

  const height = Math.tan(MathUtils.degToRad(horizontalFov) / 2) / camera.aspect;
  camera.fov = (Math.atan(height) * 2 * 180) / 3.1415926535;
  camera.updateProjectionMatrix();

  effect.uniforms["strength"]!.value = strength;
  effect.uniforms["height"]!.value = height;
  effect.uniforms["aspectRatio"]!.value = camera.aspect;
  effect.uniforms["cylindricalRatio"]!.value = cylindricalRatio;

  return composer;
}

export const init = () => {
  const scene = new Scene();
  const renderer = new WebGLRenderer();
  const camera = new PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000000
  );

  const composer = initComposer(renderer, scene, camera);

  camera.position.z = 2;
  document.body.appendChild(renderer.domElement);

  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);

  return {
    scene,
    renderer,
    camera,
    composer,
  }
}
