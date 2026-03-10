<script setup>
import { computed } from 'vue'

const props = defineProps({
  htmlContent: { type: String, default: '' },
  cssContent: { type: String, default: '' },
  jsContent: { type: String, default: '' }
})

const srcdoc = computed(() => {
  return `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <style>
        body { margin: 0; padding: 10px; font-family: sans-serif; }
        ${props.cssContent}
      </style>
    </head>
    <body>
      ${props.htmlContent}
      <script>
        try {
          ${props.jsContent}
        } catch (err) {
          const errDiv = document.createElement('div');
          errDiv.style.color = '#dc2626';
          errDiv.style.padding = '15px';
          errDiv.style.fontFamily = 'monospace';
          errDiv.style.background = '#fef2f2';
          errDiv.style.border = '1px solid #fecaca';
          errDiv.style.borderRadius = '8px';
          errDiv.style.marginTop = '10px';
          errDiv.style.lineHeight = '1.5';
          errDiv.innerText = '앗! 자바스크립트에 오류가 있어요:\\n' + err.toString();
          document.body.appendChild(errDiv);
        }
      <\/script>
    </body>
    </html>
  `
})
</script>

<template>
  <div class="preview-container">
    <iframe
      :srcdoc="srcdoc"
      frameborder="0"
      sandbox="allow-scripts"
      class="preview-iframe"
    ></iframe>
  </div>
</template>

<style scoped>
.preview-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* Preview should be white by default to look like a standard page */
  border-top: 1px solid var(--border-color);
  position: relative;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
