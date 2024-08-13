<template>
  <Suspense>
    <Canvas />

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
</style>
