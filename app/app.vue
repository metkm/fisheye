<script setup lang="ts">
import { AxesHelper } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { IMAGE_HEIGHT, IMAGE_WIDTH, MAX_PER_LINE } from "./constants";
import { createImageMesh, images } from "./urls";
import { init } from "./init";

const { composer, camera, renderer, scene } = init();

Promise.all(images.map((image) => createImageMesh(image))).then((cubes) => {
  const offsetInitial = -((MAX_PER_LINE / 2) * IMAGE_WIDTH) + (IMAGE_WIDTH / 2)
  const lineCount = Math.ceil(images.length / MAX_PER_LINE);

  let offsetx = offsetInitial;
  let offsety = (lineCount * IMAGE_HEIGHT / 2) - IMAGE_HEIGHT / 2;

  for (let index = 0; index < cubes.length; index++) {
    const cube = cubes[index];
    if (!cube) continue;

    cube.position.x = offsetx;
    cube.position.y = offsety;
    
    scene.add(cube);
    offsetx += IMAGE_WIDTH;

    if (index > 0 && (index + 1) % MAX_PER_LINE === 0) {
      offsety -= IMAGE_HEIGHT;
      offsetx = offsetInitial;
    }
  }
});

const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  controls.update();
  composer.render();
  camera.updateProjectionMatrix();
};

const helper = new AxesHelper();
scene.add(helper)

renderer.setAnimationLoop(animate);

useEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
  camera.aspect = window.innerWidth / window.innerHeight;
})
</script>

<template>
  <div></div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
</style>
