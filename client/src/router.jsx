import { createRouter, createWebHistory } from 'vue-router'
import Join from './components/Join/Join.tsx'
import Game from './components/Game/JogoDaVelha.jsx'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Join,
    },
    {
      path: '/game',
      component: Game,
    },
  ],
})