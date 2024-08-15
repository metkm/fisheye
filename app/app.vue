<template>
  <Suspense>
    <div>
      <div class="crt" />
      <Canvas />
    </div>

    <template #fallback>
      <p>loading...</p>
    </template>
  </Suspense>
</template>

<style>
body,
html,
#__nuxt {
  margin: 0;
  padding: 0;
  height: 100vh;
}

.crt::before {
  display: block;
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, transparent, black 90%);
  z-index: 2;
}

.crt {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: 
    linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.06),
      rgba(0, 255, 0, 0.02),
      rgba(0, 0, 255, 0.06)
    );
  background-size: 100% 8px, 12px 100%;
}

canvas {
  display: block;
}
</style>
