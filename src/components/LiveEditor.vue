<script setup>
import { ref } from 'vue'
import PreviewWindow from './PreviewWindow.vue'

// Editor State
const activeTab = ref('html')

// Code States
const code = ref({
  html: '<h1>안녕하세요!</h1>\n<p>코딩을 시작해봅시다.</p>\n<button id="myBtn">클릭!</button>',
  css: 'h1 {\n  color: #007acc;\n}\n\nbutton {\n  padding: 10px 20px;\n  background: #007acc;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #005f9e;\n}',
  js: 'const btn = document.getElementById("myBtn");\n\nif (btn) {\n  btn.addEventListener("click", () => {\n    for (let i = 0; i < 3; i++) {\n      alert("버튼을 " + (i+1) + "번 클릭했습니다!");\n    }\n  });\n}'
})
</script>

<template>
  <div class="live-editor">
    <div class="editor-pane">
      <div class="tabs">
        <button 
          :class="{ active: activeTab === 'html' }" 
          @click="activeTab = 'html'"
        >
          HTML
        </button>
        <button 
          :class="{ active: activeTab === 'css' }" 
          @click="activeTab = 'css'"
        >
          CSS
        </button>
        <button 
          :class="{ active: activeTab === 'js' }" 
          @click="activeTab = 'js'"
        >
          JS
        </button>
      </div>
      
      <div class="textarea-wrapper">
        <textarea 
          v-if="activeTab === 'html'" 
          v-model="code.html" 
          wrap="off" 
          spellcheck="false"
          placeholder="HTML 코드를 입력하세요..."
        ></textarea>
        
        <textarea 
          v-if="activeTab === 'css'" 
          v-model="code.css" 
          wrap="off" 
          spellcheck="false"
          placeholder="CSS 코드를 입력하세요..."
        ></textarea>
        
        <textarea 
          v-if="activeTab === 'js'" 
          v-model="code.js" 
          wrap="off" 
          spellcheck="false"
          placeholder="JavaScript 코드를 입력하세요..."
        ></textarea>
      </div>
    </div>
    
    <div class="preview-pane">
      <div class="preview-header">
        <span>결과 화면 (Result)</span>
      </div>
      <div class="preview-content">
        <PreviewWindow 
          :htmlContent="code.html" 
          :cssContent="code.css" 
          :jsContent="code.js" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.live-editor {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.editor-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
  border-bottom: 2px solid var(--border-color);
  min-height: 50%;
}

.tabs {
  display: flex;
  background-color: var(--bg-panel);
  border-bottom: 1px solid var(--border-color);
  padding: 0 10px;
}

.tabs button {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 10px 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: inherit;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  outline: none;
}

.tabs button:hover {
  color: var(--text-primary);
}

.tabs button.active {
  color: #fff;
  border-bottom: 2px solid var(--accent-color);
  background-color: #1e1e1e;
}

.textarea-wrapper {
  flex: 1;
  position: relative;
}

textarea {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  border: none;
  resize: none;
  outline: none;
  tab-size: 2;
}

.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 50%;
}

.preview-header {
  height: 40px;
  background-color: var(--bg-panel);
  display: flex;
  align-items: center;
  padding: 0 15px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.preview-content {
  flex: 1;
  position: relative;
}
</style>
