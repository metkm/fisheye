<script setup lang="ts">
import { AxesHelper, Box3, Group, Vector3 } from "three";
import { IMAGE_HEIGHT, IMAGE_WIDTH, MAX_PER_LINE } from "~/constants";
import { createImageMesh, images } from "~/urls";
import { init } from "~/init";

const { composer, camera, renderer, scene } = init();

const filledArray = fillArray(images, 60);
// const group = new Group();
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
    group: lastGroup
  }
}

// const controls = new OrbitControls(camera, renderer.domElement);
const helper = new AxesHelper();
// const box = new Box3().setFromObject(group);

// const size = new Vector3();
// box.getSize(size);
// const size = box.getSize(new Vector3());

const animate = () => {
  // const direction = camera.getWorldDirection(new Vector3());
  camera.position.x += 0.1;

  const result = getLastGroup();

  if (result && camera.position.x > (result.size.x / 2)) {
    const newGroup = result.group.clone();
    newGroup.position.x = result.size.x + result.group.position.x;

    console.log(newGroup.position.x)

    scene.add(newGroup);
    groups.push(newGroup);
  }

  // if (result?.size && camera.position.x > result.size.x / 2) {
  //   const newGroup = result.group.clone();
  //   newGroup.position.x = result.size.x;

  //   scene.add(newGroup);
  //   groups.push(newGroup);

  //   console.log("added new group", result.size.x)

  //   if (groups.length > 2) {
  //     const firstGroup = groups.shift();

  //     firstGroup?.children.forEach(child => {
  //       scene.remove(child);
  //     })

  //     console.log("removing first group")
  //   }
  // }

  composer.render();
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
