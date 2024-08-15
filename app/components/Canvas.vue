<script setup lang="ts">
import { AxesHelper, PerspectiveCamera, Scene } from "three";
import type { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import {
  createGroupBuffer,
  getLastGroupFromBuffer,
  intersectsWithLastGroup,
} from "~/buffer";
import { init } from "~/init";

const canvasElement = ref<HTMLCanvasElement>();
const groups = await createGroupBuffer();

const animate = (
  camera: PerspectiveCamera,
  scene: Scene,
  composer: EffectComposer
) => {
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

onMounted(async () => {
  const { composer, camera, renderer, scene } = init(canvasElement);
  const helper = new AxesHelper();

  scene.add(helper);
  scene.add(groups[0]!);
  renderer.setAnimationLoop(() => {
    animate(camera, scene, composer);
  });

  useEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.updateProjectionMatrix();
    camera.aspect = window.innerWidth / window.innerHeight;
  });
});
</script>

<template>
  <canvas ref="canvasElement" class="canvas" />
</template>
