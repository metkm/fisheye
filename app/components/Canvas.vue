<script setup lang="ts">
import { AxesHelper } from "three";
import {
  createGroupBuffer,
  getLastGroupFromBuffer,
  intersectsWithLastGroup,
} from "~/buffer";
import { init } from "~/init";

const { composer, camera, renderer, scene } = init();
const groups = await createGroupBuffer();

const helper = new AxesHelper();

const animate = () => {
  camera.position.x += 0.01;

  const lastGroup = getLastGroupFromBuffer(groups);

  if (lastGroup && intersectsWithLastGroup(groups, camera.position.x)) {
    const newGroup = lastGroup.group.clone();
    newGroup.position.x = lastGroup.size.x + lastGroup.group.position.x;

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
  camera.updateProjectionMatrix();
};

scene.add(helper);
scene.add(groups[0]!);
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
