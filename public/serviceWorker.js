// @ts-check

/* eslint-disable no-restricted-globals, no-console */
self.addEventListener("install", function install(e) {
  console.log("[ServiceWorker] Install");
});

self.addEventListener("activate", function activate(e) {
  console.log("[ServiceWorker] Activate");
});

self.addEventListener("fetch", function fetch(e) {
  // for Add to Home Screen
  // なぞの技術
});
