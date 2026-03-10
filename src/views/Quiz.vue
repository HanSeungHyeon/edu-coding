<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { curriculum } from '../data/curriculum.js'
import { addXp, userStore } from '../store/userStore.js'
import JSConfetti from 'js-confetti'

const props = defineProps({
  subject: { type: String, required: true },
  lessonIndex: { type: String, required: true }
})

const router = useRouter()
const jsConfetti = new JSConfetti()

const subjectData = computed(() => curriculum[props.subject])
const currentIndex = computed(() => parseInt(props.lessonIndex, 10))
const currentLesson = computed(() => {
  if (!subjectData.value) return null;
  return subjectData.value.lessons[currentIndex.value]
})
const quiz = computed(() => currentLesson.value?.quiz)

const isLastLesson = computed(() => {
  return subjectData.value && currentIndex.value >= subjectData.value.lessons.length - 1
})

// Check answers
const userAnswer = ref('')
const selectedOption = ref(null)
const isCorrect = ref(false)
const showFeedback = ref(false)

// Reset state when route changes
watch(() => props.lessonIndex, () => {
  userAnswer.value = ''
  selectedOption.value = null
  isCorrect.value = false
  showFeedback.value = false
})

const checkAnswer = () => {
  if (!quiz.value) return;
  
  if (quiz.value.type === 'multiple') {
    isCorrect.value = selectedOption.value === quiz.value.answer;
  } else if (quiz.value.type === 'fill-in') {
    isCorrect.value = userAnswer.value.trim().toLowerCase() === quiz.value.answer.toLowerCase();
  }
  
  showFeedback.value = true;
  
  if (isCorrect.value) {
    const gainedXp = addXp(50, `quiz-${props.subject}-${props.lessonIndex}`)
    
    // Check if user leveled up
    jsConfetti.addConfetti({
      emojis: ['🎉', '✨', '💻', '🚀'],
      emojiSize: 50,
      confettiNumber: gainedXp ? 80 : 30, // more confetti if gained XP
    })
  }
}

const selectOption = (idx) => {
  if (showFeedback.value) return; // Don't allow changing answer after checking
  selectedOption.value = idx;
}

const proceedNext = () => {
  if (isLastLesson.value) {
    router.push(`/practice/${props.subject}`)
  } else {
    router.push(`/theory/${props.subject}/${currentIndex.value + 1}`)
  }
}
</script>

<template>
  <div class="quiz-container">
    <div class="quiz-card" v-if="quiz">
      <div class="badge">Quiz 타임!</div>
      
      <h2 class="question">{{ quiz.question }}</h2>
      
      <!-- 객관식 -->
      <div v-if="quiz.type === 'multiple'" class="options-list">
        <div 
          v-for="(opt, idx) in quiz.options" 
          :key="idx"
          class="option-item"
          :class="{ 
            'selected': selectedOption === idx,
            'correct-reveal': showFeedback && idx === quiz.answer,
            'wrong-reveal': showFeedback && selectedOption === idx && selectedOption !== quiz.answer
          }"
          @click="selectOption(idx)"
        >
          <span class="opt-label">{{ idx + 1 }}</span>
          <code class="opt-text">{{ opt }}</code>
        </div>
      </div>
      
      <!-- 주관식 (빈칸 채우기) -->
      <div v-if="quiz.type === 'fill-in'" class="fill-in-container">
        <div class="template-box">
          {{ quiz.template.split('[')[0] }}
          <input 
            type="text" 
            v-model="userAnswer" 
            :disabled="showFeedback"
            placeholder="정답 입력"
            @keyup.enter="checkAnswer"
          />
          {{ quiz.template.split(']')[1] }}
        </div>
      </div>
      
      <div class="action-row" v-if="!showFeedback">
        <button 
          class="btn btn-primary lg" 
          @click="checkAnswer"
          :disabled="(quiz.type === 'multiple' && selectedOption === null) || (quiz.type === 'fill-in' && !userAnswer.trim())"
        >
          정답 확인하기
        </button>
      </div>
      
      <!-- 피드백 영역 -->
      <div v-if="showFeedback" class="feedback-panel" :class="isCorrect ? 'correct' : 'wrong'">
        <div class="feedback-icon" v-if="isCorrect">✅ 정답입니다!</div>
        <div class="feedback-icon" v-else>❌ 아쉽네요, 다시 생각해볼까요?</div>
        
        <p class="explanation" v-if="isCorrect || !isCorrect">{{ quiz.explanation }}</p>
        
        <div class="mt-4" v-if="isCorrect">
          <button class="btn btn-primary" @click="proceedNext">
            {{ isLastLesson ? '최종 종합 실습으로 넘어가기 🌟' : '다음 배움틀로 이동 ➡️' }}
          </button>
        </div>
        <div class="mt-4" v-else>
          <button class="btn btn-outline" @click="showFeedback = false; userAnswer = ''; selectedOption = null">
            다시 시도하기
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem 1.5rem;
  width: 100%;
  min-height: calc(100vh - 60px);
  background-color: var(--bg-color);
}

.quiz-card {
  background: white;
  border-radius: var(--radius);
  padding: 3rem;
  max-width: 700px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
  position: relative;
  text-align: center;
}

.badge {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #f59e0b;
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.2);
}

.question {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-top: 1rem;
  margin-bottom: 2.5rem;
  line-height: 1.5;
  font-weight: 700;
  word-break: keep-all;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
  margin-bottom: 2rem;
}

.option-item {
  padding: 1rem 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  background-color: white;
}

.option-item:hover:not(.correct-reveal):not(.wrong-reveal) {
  border-color: var(--accent-light);
  background-color: #f8fafc;
}

.option-item.selected {
  border-color: var(--accent-color);
  background-color: var(--accent-light);
}

.opt-label {
  width: 28px;
  height: 28px;
  background: var(--bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--text-secondary);
  margin-right: 1rem;
  font-size: 0.9rem;
}

.opt-text {
  font-size: 1.1rem;
  font-weight: 600;
}

/* Feedback states for options */
.correct-reveal {
  border-color: var(--success-color) !important;
  background-color: #ecfdf5 !important;
}

.wrong-reveal {
  border-color: #ef4444 !important;
  background-color: #fef2f2 !important;
  opacity: 0.7;
}

/* Fill-in styles */
.fill-in-container {
  margin-bottom: 2.5rem;
}

.template-box {
  background: #1e293b;
  padding: 1.5rem;
  border-radius: 12px;
  color: white;
  font-family: 'Consolas', monospace;
  font-size: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}

.template-box input {
  background: transparent;
  border: none;
  border-bottom: 2px solid var(--accent-color);
  color: #fde047;
  font-family: 'Consolas', monospace;
  font-size: 1.25rem;
  text-align: center;
  width: 150px;
  padding: 0.25rem;
  outline: none;
  font-weight: bold;
}

.template-box input:focus {
  border-bottom-width: 3px;
}

.action-row {
  margin-top: 2rem;
}

.btn.lg {
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  border-radius: 30px;
  box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
}

.btn.lg:disabled {
  background-color: #cbd5e1;
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

/* Feedback panel */
.feedback-panel {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 12px;
  animation: fadeIn 0.3s ease-out;
}

.feedback-panel.correct {
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
}

.feedback-panel.wrong {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
}

.feedback-icon {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.correct .feedback-icon { color: #059669; }
.wrong .feedback-icon { color: #dc2626; }

.explanation {
  color: var(--text-primary);
  line-height: 1.6;
}

.mt-4 { margin-top: 1.5rem; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
