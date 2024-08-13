<script setup lang="ts">
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createImageMesh, images } from "./urls";
import { init } from "./init";
import { IMAGE_HEIGHT, IMAGE_WIDTH } from "./constants";

const { composer, camera, renderer, scene } = init();

Promise.all(images.map((image) => createImageMesh(image))).then((cubes) => {
  let offsetx = 0;
  let offsety = 5;

  for (let index = 0; index < cubes.length; index++) {
    const cube = cubes[index];
    if (!cube) continue;

    if (index % 4 === 0) {
      offsety -= IMAGE_HEIGHT;
      offsetx = 0;
    }

    cube.position.x = offsetx;
    cube.position.y = offsety;
    
    scene.add(cube);
    offsetx += IMAGE_WIDTH;
  }
});

const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  controls.update();
  composer.render();
  camera.updateProjectionMatrix();
};

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
