<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { curriculum } from '../data/curriculum.js'
import PreviewWindow from '../components/PreviewWindow.vue'
import AssistantBot from '../components/AssistantBot.vue'
import { addXp } from '../store/userStore.js'

const props = defineProps({
  subject: { type: String, required: true },
  lessonIndex: { type: String, default: '0' }
})

const router = useRouter()

const subjectData = computed(() => curriculum[props.subject])
const currentIndex = computed(() => parseInt(props.lessonIndex, 10) || 0)
const currentLesson = computed(() => {
  if (!subjectData.value || !subjectData.value.lessons) return null;
  return subjectData.value.lessons[currentIndex.value]
})

const isLastLesson = computed(() => {
  return subjectData.value && currentIndex.value >= subjectData.value.lessons.length - 1
})

const headerText = computed(() => {
  if (props.subject === 'html') return 'HTML';
  if (props.subject === 'css') return 'CSS';
  if (props.subject === 'js') return 'JavaScript';
  return '학습';
})

const goToQuiz = () => {
  // Give a small amount of XP for finishing reading theory
  addXp(20, `theory-${props.subject}-${currentIndex.value}`)
  router.push(`/quiz/${props.subject}/${currentIndex.value}`)
}

const botMessages = computed(() => {
  return [
    `지금 배우는 내용은 ${currentLesson.value?.title} 이에요!`,
    "핵심 내용을 꼼꼼히 읽어보세요.",
    "다 읽고 나면 하단의 퀴즈를 풀어 포인트를 획득해보세요! 🎯"
  ]
})
</script>

<template>
  <div class="theory-container">
    <div class="theory-card" v-if="currentLesson">
      <div class="header-nav">
        <router-link to="/" class="back-link">← 처음으로</router-link>
        <div class="progress-indicator">
          <span>{{ headerText }} 과정: {{ currentIndex + 1 }} / {{ subjectData.lessons.length }}</span>
        </div>
      </div>
      
      <h2 class="title">{{ currentLesson.title }}</h2>
      
      <div class="theory-content" v-html="currentLesson.theory"></div>
      
      <div class="examples-section">
        <h3 class="section-title">👀 코드가 화면에 어떻게 보일까요?</h3>
        
        <div class="example-grid">
          <div class="example-card" v-for="(ex, idx) in currentLesson.examples" :key="idx">
            <div class="example-description">{{ ex.description }}</div>
            <div class="example-code"><code>{{ ex.code }}</code></div>
            <div class="example-preview-wrapper">
               <!-- Make sure html goes to HTML, CSS to CSS based on subject -->
               <PreviewWindow 
                :htmlContent="subject === 'html' ? ex.code : (subject==='js' ? `<button id='btn'>테스트용 버튼</button>` : `<div class='demo'>테스트</div>`)" 
                :cssContent="subject === 'css' ? `.demo { ${ex.code.replace(/<[^>]+>/g, '')} }` : ''" 
                :jsContent="subject === 'js' ? ex.code.replace(/<[^>]+>/g, '') : ''" 
                v-if="subject === 'html'"
               />
               <!-- Simplistic renderer for example visualization -->
               <div class="simple-preview" v-else v-html="ex.code"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button class="btn btn-primary lg w-100" @click="goToQuiz">
          내용을 이해했어요! 확인 퀴즈 풀기 🎯
        </button>
      </div>
    </div>
    
    <div class="theory-card error-card" v-else>
      <h2>학습 데이터를 찾을 수 없습니다.</h2>
      <router-link to="/" class="btn btn-primary">홈으로 돌아가기</router-link>
    </div>
    
    <AssistantBot :messages="botMessages" :delay="1000" />
  </div>
</template>

<style scoped>
.theory-container {
  display: flex;
  justify-content: center;
  padding: 3rem 1.5rem;
  width: 100%;
}

.theory-card {
  background: var(--panel-bg);
  border-radius: var(--radius);
  padding: 3rem;
  max-width: 900px;
  width: 100%;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--border-color);
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: var(--accent-color);
}

.progress-indicator {
  background: var(--bg-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-color);
}

.title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--bg-color);
  font-weight: 700;
  letter-spacing: -0.5px;
}

.theory-content {
  color: var(--text-primary);
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 3rem;
}

.theory-content :deep(h3) {
  font-size: 1.3rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--accent-color);
}

.theory-content :deep(p) {
  margin-bottom: 1rem;
}

.theory-content :deep(code) {
  background-color: var(--accent-light);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 0.9em;
  color: var(--accent-hover);
  font-weight: 600;
}

.examples-section {
  background: var(--bg-color);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 3rem;
}

.section-title {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.example-grid {
  display: grid;
  gap: 1.5rem;
}

.example-card {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.example-description {
  padding: 0.75rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.example-code {
  padding: 1rem;
  background: #1e293b;
  color: #f8fafc;
  font-family: 'Consolas', monospace;
  font-size: 0.9rem;
  overflow-x: auto;
}

.example-preview-wrapper {
  border-top: 1px solid var(--border-color);
  background: white;
  position: relative;
  min-height: 80px;
}

.simple-preview {
  padding: 1.5rem;
}

.actions {
  margin-top: 2rem;
}

.w-100 {
  width: 100%;
}

.error-card {
  text-align: center;
}
</style>
