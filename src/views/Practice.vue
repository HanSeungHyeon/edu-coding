<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { curriculum } from '../data/curriculum.js'
import PreviewWindow from '../components/PreviewWindow.vue'
import { markCourseComplete } from '../store/userStore.js'
import JSConfetti from 'js-confetti'
import AssistantBot from '../components/AssistantBot.vue'

const props = defineProps({
  subject: {
    type: String,
    required: true
  }
})

const router = useRouter()
const jsConfetti = new JSConfetti()
const subjectData = computed(() => curriculum[props.subject])
const practiceData = computed(() => subjectData.value?.practice || { title: '실습', html: '', css: '', js: '' })

// Determine which tab to show based on subject
const activeTab = ref(props.subject === 'js' ? 'js' : props.subject === 'css' ? 'css' : 'html')

const code = ref({
  html: '',
  css: '',
  js: ''
})

const initCode = () => {
  if (practiceData.value) {
    code.value = {
      html: practiceData.value.html,
      css: practiceData.value.css,
      js: practiceData.value.js
    }
  }
}

const finishPractice = () => {
  // Give 200 XP if it's the first time finishing this subject
  const leveledUp = markCourseComplete(props.subject)
  
  if (leveledUp) {
    jsConfetti.addConfetti({
      emojis: ['🌟', '🏆', '💯', '👑'],
      emojiSize: 60,
      confettiNumber: 130,
    })
    alert(`축하합니다! ${practiceData.value.title} 과정을 완수했습니다! (보너스 +200 XP)`)
  } else {
    jsConfetti.addConfetti({
      confettiRadius: 6,
      confettiNumber: 50,
      confettiColors: ['#4f46e5', '#10b981', '#f59e0b']
    })
    alert(`복습을 완료했습니다! 코딩 실력이 더욱 단단해졌네요.`)
  }
}

watch(() => props.subject, () => {
  activeTab.value = props.subject === 'js' ? 'js' : props.subject === 'css' ? 'css' : 'html'
  initCode()
})

onMounted(() => {
  initCode()
})

const botMessages = computed(() => {
  if (props.subject === 'html') {
    return [
      "드디어 첫 종합 실습이네요! 환영해요 🎉",
      "이곳에서는 방금 배운 HTML 태그를 마음껏 써볼 수 있어요.",
      "좌측 에디터에 있는 <h1>태그 안의 글자를 본인 이름으로 바꿔볼까요?"
    ]
  } else if (props.subject === 'css') {
    return [
      "CSS 실습장에 오신 것을 환영해요! 🎨",
      "제가 예쁜 카페 사진(cafe_header.png)을 넣어두었어요.",
      "좌측 코드에서 color나 background-color를 검색해서 카페 색상을 바꿔보세요!"
    ]
  } else {
    return [
      "자바스크립트의 세계에 오셨군요! ⚡",
      "버튼을 눌렀을 때 숫자가 올라가도록 코드를 수정해 보세요.",
      "막힌다면 이전 이론 학습에서 배운 걸 떠올려 보세요!"
    ]
  }
})
</script>

<template>
  <div class="practice-container">
    <div class="editor-pane">
      <div class="practice-header">
        <router-link :to="`/theory/${props.subject}/0`" class="back-link">← 처음부터 다시하기</router-link>
        <span class="p-title">{{ practiceData.title }}</span>
        <button class="btn btn-primary compact-btn" @click="finishPractice">실습 완료하기 👑</button>
      </div>
      
      <div class="tabs">
        <button 
          :class="{ active: activeTab === 'html' }" 
          @click="activeTab = 'html'"
        >
          HTML 뼈대
        </button>
        <button 
          :class="{ active: activeTab === 'css' }" 
          @click="activeTab = 'css'"
        >
          CSS 스타일
        </button>
        <button 
          :class="{ active: activeTab === 'js' }" 
          @click="activeTab = 'js'"
        >
          JS 동작
        </button>
      </div>
      
      <div class="textarea-wrapper">
        <textarea 
          v-if="activeTab === 'html'" 
          v-model="code.html" 
          wrap="off" 
          spellcheck="false"
          placeholder="여기에 HTML 코드를 입력하세요..."
        ></textarea>
        
        <textarea 
          v-if="activeTab === 'css'" 
          v-model="code.css" 
          wrap="off" 
          spellcheck="false"
          placeholder="여기에 CSS 스타일을 입력하세요..."
        ></textarea>
        
        <textarea 
          v-if="activeTab === 'js'" 
          v-model="code.js" 
          wrap="off" 
          spellcheck="false"
          placeholder="여기에 JavaScript 코드를 입력하세요..."
        ></textarea>
      </div>
    </div>
    
    <div class="preview-pane">
      <div class="preview-header">
        <span class="preview-title">💻 내가 직접 수정하는 웹사이트</span>
      </div>
      <div class="preview-content">
        <PreviewWindow 
          :htmlContent="code.html" 
          :cssContent="code.css" 
          :jsContent="code.js" 
        />
      </div>
    </div>
    
    <AssistantBot :messages="botMessages" :delay="1500" />
  </div>
</template>

<style scoped>
.practice-container {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px); 
  width: 100%;
}

.practice-header {
  height: 48px;
  background-color: var(--panel-bg);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
}

.back-link:hover {
  color: var(--accent-color);
}

.p-title {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.compact-btn {
  padding: 6px 14px;
  font-size: 0.85rem;
  border-radius: 8px;
}

.editor-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--panel-bg);
  border-right: 1px solid var(--border-color);
  max-width: 50%;
}

.tabs {
  display: flex;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  padding: 0 5px;
}

.tabs button {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 14px 24px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: inherit;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
  outline: none;
  margin-top: 4px;
}

.tabs button:hover {
  color: var(--text-primary);
  background-color: rgba(0,0,0,0.02);
  border-radius: 8px 8px 0 0;
}

.tabs button.active {
  color: var(--accent-color);
  border-bottom: 3px solid var(--accent-color);
  background-color: var(--panel-bg);
  border-radius: 8px 8px 0 0;
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
  padding: 24px;
  background-color: #fafbfc;
  color: #1e293b;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 15px;
  line-height: 1.6;
  border: none;
  resize: none;
  outline: none;
  tab-size: 2;
  border-top: 1px solid #f1f5f9;
}

.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f1f5f9; /* Slightly darker background to show white page borders */
}

.preview-header {
  height: 48px;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-bottom: 1px solid var(--border-color);
}

.preview-title {
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.preview-content {
  flex: 1;
  position: relative;
}

.preview-content :deep(iframe) {
  /* Make the iframe look like a browser window holding real content */
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
  background: white;
}
</style>
