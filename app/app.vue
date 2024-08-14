<template>
  <Suspense>
    <div>
      <Teleport to="body">
        <div class="crt" />
      </Teleport>
      <Canvas />
    </div>

    <template #fallback>
      <p>loading...</p>
    </template>
  </Suspense>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
}

.crt {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
  background-size: 100% 8px, 12px 100%;
}
</style>
