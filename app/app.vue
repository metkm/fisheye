<script setup lang="ts">
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createImageMesh, images } from "./urls";
import { init } from "./init";

const { composer, camera, renderer, scene } = init();

Promise.all(images.map((image) => createImageMesh(image))).then((cubes) => {
  let offsetx = 0;
  let offsety = 5;

  for (let index = 0; index < cubes.length; index++) {
    const cube = cubes[index];
    if (!cube) continue;

    if (index % 4 === 0) {
      offsety -= 3;
      offsetx = 0;
    }

    cube.position.x = offsetx;
    cube.position.y = offsety;
    
    scene.add(cube);
    offsetx += 6;
  }
});

const controls = new OrbitControls(camera, renderer.domElement);
const animate = () => {
  controls.update();
  // renderer.render(scene, camera);
  composer.render();
  camera.updateProjectionMatrix();
};

renderer.setAnimationLoop(animate);

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
