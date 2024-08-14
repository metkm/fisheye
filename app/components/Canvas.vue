<script setup lang="ts">
import { AxesHelper, Box3, Group, Vector3 } from "three";
import { IMAGE_HEIGHT, IMAGE_WIDTH, MAX_PER_LINE } from "~/constants";
import { createImageMesh, images } from "~/urls";
import { init } from "~/init";

const { composer, camera, renderer, scene } = init();

const filledArray = fillArray(images, 60);
const groups = [new Group()];

const cubes = await Promise.all(
  filledArray.map((image) => createImageMesh(image))
);

const offsetInitial = -((MAX_PER_LINE / 2) * IMAGE_WIDTH) + IMAGE_WIDTH / 2;
const lineCount = Math.ceil(images.length / MAX_PER_LINE);

let offsetx = offsetInitial;
let offsety = (lineCount * IMAGE_HEIGHT) / 2 - IMAGE_HEIGHT / 2;

const group = groups.at(0);
for (let index = 0; index < cubes.length; index++) {
  const cube = cubes[index];
  if (!cube) continue;

  group!.add(cube);

  cube.position.x = offsetx;
  cube.position.y = offsety;

  offsetx += IMAGE_WIDTH;

  if (index > 0 && (index + 1) % MAX_PER_LINE === 0) {
    offsety -= IMAGE_HEIGHT;
    offsetx = offsetInitial;
  }
}

scene.add(group!);

const getLastGroup = () => {
  const lastGroup = groups.at(-1);
  if (!lastGroup) return;

  const box = new Box3().setFromObject(lastGroup);
  const size = new Vector3();

  box.getSize(size);

  return {
    size,
    group: lastGroup,
  };
};

const helper = new AxesHelper();

const animate = () => {
  camera.position.x += 0.01;

  const result = getLastGroup();
  const groupEndPoint = result
    ? result.size.x + result.group.position.x - result.size.x / 2
    : -1;

  if (result && camera.position.x > groupEndPoint - (result.size.x / 4)) {
    const newGroup = result.group.clone();
    newGroup.position.x = result.size.x + result.group.position.x;

    if (groups.length > 2) {
      const firstGroup = groups.shift();
      if (firstGroup) {
        scene.remove(firstGroup);
      }
    }

    scene.add(newGroup);
    groups.push(newGroup);
  }

  composer.render();
  // renderer.render(scene, camera);
  camera.updateProjectionMatrix();
};

scene.add(helper);
renderer.setAnimationLoop(animate);

useEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
  camera.aspect = window.innerWidth / window.innerHeight;
});
</script>

<template>
  <div></div>
</template>
