<script setup>
import { computed } from 'vue'
import { userStore, getLevelInfo } from './store/userStore.js'

const levelInfo = computed(() => getLevelInfo())
</script>

<template>
  <div class="header">
    <router-link to="/">
      <h1>CodeEdu - 기초 코딩 학습</h1>
    </router-link>
    
    <div class="user-stats">
      <div class="level-badge">Lv. {{ levelInfo.level }}</div>
      <div class="xp-bar-container">
        <div class="xp-bar-fill" :style="{ width: levelInfo.progress + '%' }"></div>
      </div>
      <div class="xp-text">{{ levelInfo.xp }} XP</div>
    </div>
  </div>
  
  <div class="main-container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.user-stats {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
  padding: 6px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  border: 1px solid var(--border-color);
}

.level-badge {
  font-weight: 800;
  color: var(--accent-color);
  font-size: 0.95rem;
}

.xp-bar-container {
  width: 100px;
  height: 8px;
  background-color: var(--bg-color);
  border-radius: 4px;
  overflow: hidden;
}

.xp-bar-fill {
  height: 100%;
  background: var(--accent-gradient);
  border-radius: 4px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.xp-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}
</style>
