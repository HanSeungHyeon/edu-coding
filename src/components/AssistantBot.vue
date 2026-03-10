<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  delay: {
    type: Number,
    default: 1000
  }
})

const currentMessageIndex = ref(0)
const isVisible = ref(false)
const showSpeechBubble = ref(false)

const showNextMessage = () => {
  if (currentMessageIndex.value < props.messages.length - 1) {
    showSpeechBubble.value = false
    setTimeout(() => {
      currentMessageIndex.value++
      showSpeechBubble.value = true
    }, 500)
  } else {
    // Loop back or hide? Let's hide for now after a long wait
    setTimeout(() => {
      showSpeechBubble.value = false
    }, 5000)
  }
}

watch(() => props.messages, () => {
  currentMessageIndex.value = 0
  showSpeechBubble.value = false
  setTimeout(() => { showSpeechBubble.value = true }, props.delay)
})

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
    setTimeout(() => { showSpeechBubble.value = true }, 500)
  }, props.delay)
})
</script>

<template>
  <div class="assistant-bot" :class="{ visible: isVisible }">
    <div class="speech-bubble" :class="{ show: showSpeechBubble }" @click="showNextMessage">
      {{ messages[currentMessageIndex] }}
      <div class="next-indicator" v-if="currentMessageIndex < messages.length - 1">클릭해서 넘기기 ▶</div>
    </div>
    <div class="bot-avatar" @click="showSpeechBubble = !showSpeechBubble">
      <div class="face">
        <div class="eyes">
          <div class="eye"></div>
          <div class="eye"></div>
        </div>
        <div class="mouth"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.assistant-bot {
  position: fixed;
  bottom: 30px;
  right: -100px;
  display: flex;
  align-items: flex-end;
  gap: 15px;
  transition: right 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1000;
  pointer-events: none; /* Let clicks pass through empty areas */
}

.assistant-bot.visible {
  right: 30px;
}

.speech-bubble {
  background: white;
  padding: 15px 20px;
  border-radius: 18px 18px 0 18px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  border: 2px solid var(--accent-light);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-primary);
  max-width: 250px;
  opacity: 0;
  transform: translateY(20px) scale(0.9);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: auto;
  cursor: pointer;
  position: relative;
  line-height: 1.4;
}

.speech-bubble.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.next-indicator {
  font-size: 0.7rem;
  color: var(--text-secondary);
  text-align: right;
  margin-top: 8px;
  font-weight: 500;
}

.bot-avatar {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #a78bfa 0%, #6366f1 100%);
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  pointer-events: auto;
  cursor: pointer;
  animation: float 4s ease-in-out infinite;
}

.face {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.eyes {
  display: flex;
  gap: 12px;
}

.eye {
  width: 8px;
  height: 12px;
  background-color: white;
  border-radius: 5px;
  animation: blink 3s infinite;
}

.mouth {
  width: 14px;
  height: 6px;
  background-color: white;
  border-radius: 0 0 10px 10px;
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes blink {
  0%, 96%, 98% { transform: scaleY(1); }
  97% { transform: scaleY(0.1); }
}
</style>
