<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// No Firebase Auth logic needed
</script>

<style>
:root {
  --primary-color: #1DB954;
  --primary-hover: #1ed760;
  --background-base: #121212;
  --background-highlight: #282828;
  --background-press: #000;
  --background-elevated-base: #242424;
  --background-elevated-highlight: #2a2a2a;
  --background-tinted-base: hsla(0,0%,100%,.07);
  --background-tinted-highlight: hsla(0,0%,100%,.1);
  --text-base: #fff;
  --text-subdued: #a7a7a7;
  --text-bright-accent: #1ed760;
  --essential-base: #fff;
  --essential-subdued: #727272;
  --essential-bright-accent: #1ed760;
  --decorative-base: #fff;
  --decorative-subdued: #292929;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: var(--background-base);
  color: var(--text-base);
  line-height: 1.5;
}

button {
  font-family: inherit;
}

a {
  color: inherit;
  text-decoration: none;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--background-base);
}

::-webkit-scrollbar-thumb {
  background: var(--background-highlight);
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--essential-subdued);
}
</style>
