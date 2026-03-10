import { reactive, watch } from 'vue'

// Local storage key
const STORAGE_KEY = 'edu_coding_user_data'

// Calculate level based on XP (e.g. 100 XP for Lv2, 300 for Lv3, etc.)
const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

// Calculate progress percentage to next level
const calculateProgress = (xp) => {
  const currentLevel = calculateLevel(xp)
  const currentLevelBaseXP = Math.pow(currentLevel - 1, 2) * 100
  const nextLevelBaseXP = Math.pow(currentLevel, 2) * 100
  
  const xpInCurrentLevel = xp - currentLevelBaseXP
  const xpNeededForNext = nextLevelBaseXP - currentLevelBaseXP
  
  return Math.floor((xpInCurrentLevel / xpNeededForNext) * 100)
}

// Load initial state
const loadState = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  return {
    xp: 0,
    completedCourses: [],
    completedQuizzes: [] // Store IDs like 'html-0' to avoid giving XP twice
  }
}

export const userStore = reactive(loadState())

// Save state whenever it changes
watch(userStore, (newState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
}, { deep: true })

export const addXp = (amount, sourceId) => {
  // Prevent duplicate XP for same quiz/task
  if (sourceId && userStore.completedQuizzes.includes(sourceId)) {
    return false // Already awarded
  }
  
  if (sourceId) {
    userStore.completedQuizzes.push(sourceId)
  }
  
  userStore.xp += amount
  return true
}

export const markCourseComplete = (subject) => {
  if (!userStore.completedCourses.includes(subject)) {
    userStore.completedCourses.push(subject)
    userStore.xp += 200 // Big bonus for finishing a course
    return true
  }
  return false
}

export const getLevelInfo = () => {
  return {
    level: calculateLevel(userStore.xp),
    progress: calculateProgress(userStore.xp),
    xp: userStore.xp
  }
}
