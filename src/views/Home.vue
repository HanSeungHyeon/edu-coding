import { useRouter } from 'vue-router'
import { userStore } from '../store/userStore.js'

const router = useRouter()

const courses = [
  {
    id: 'html',
    title: 'HTML 기초',
    description: '웹 페이지의 뼈대를 만드는 HTML 태그들을 배워봅니다.',
    icon: '📄',
    color: '#e34f26',
    bgColor: '#fdeeed'
  },
  {
    id: 'css',
    title: 'CSS 스타일링',
    description: '배경색, 여백 등 웹 페이지를 예쁘게 꾸미는 방법을 알아봅니다.',
    icon: '🎨',
    color: '#1572b6',
    bgColor: '#e8f4fd'
  },
  {
    id: 'js',
    title: 'JavaScript 입문',
    description: '웹 페이지에 생명력을 불어넣는 스크립트를 작성해봅시다.',
    icon: '⚡',
    color: '#f7df1e',
    bgColor: '#fffce8'
  }
]

const startCourse = (subjectId) => {
  router.push(`/theory/${subjectId}/0`) // Start at the first lesson explicitly
}
</script>

<template>
  <div class="home-container">
    <div class="hero">
      <h2>어떤 코딩을 배워볼까요?</h2>
      <p>원하는 과목을 선택하고 기초부터 튼튼하게 학습해보세요.</p>
    </div>
    
    <div class="course-grid">
      <div 
        v-for="course in courses" 
        :key="course.id" 
        class="course-card"
        :style="{ '--hover-color': course.color }"
        @click="startCourse(course.id)"
      >
        <div class="icon-wrapper" :style="{ backgroundColor: course.bgColor, color: course.color }">
          <span class="icon">{{ course.icon }}</span>
        </div>
        
        <div class="completion-badge" v-if="userStore.completedCourses.includes(course.id)">
          👑 수료 완료!
        </div>
        
        <h3>{{ course.title }}</h3>
        <p>{{ course.description }}</p>
        <button class="btn btn-outline start-btn">학습 시작하기</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
  width: 100%;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.hero p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.course-card {
  background: var(--panel-bg);
  border-radius: var(--radius);
  padding: 2.5rem 2rem;
  border: 1px solid rgba(255,255,255,0.8);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--hover-color);
  opacity: 0.8;
  transition: opacity 0.3s;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
}

.icon-wrapper {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 16px -8px var(--hover-color);
}

.icon {
  font-size: 2rem;
}

.course-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
}

.course-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.start-btn {
  width: 100%;
  pointer-events: none; /* Let the card handle the click */
}

.completion-badge {
  position: absolute;
  top: 15px;
  right: -30px;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  padding: 5px 35px;
  transform: rotate(45deg);
  box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);
  letter-spacing: 0.5px;
}
</style>
