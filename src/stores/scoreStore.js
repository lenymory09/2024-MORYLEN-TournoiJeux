import {defineStore} from "pinia";

const equipes = [
  {
    id : 1,
    name: "Equipe 1",
    score: 5
  },
  {
    id : 2,
    name: "Equipe 2",
    score: 1
  }
];

const matchs = [
  {
    id: 1,
    equipe1: 1,
    equipe2: 2,
    score1: 0,
    score2: 0
  }
]

export const useScoreStore = defineStore('scoreStore', {
  state: () => ({
    equipes,
    matchs
  }),
  getters: {
    /**
     * retourne les équipes triées par score
     */
    getEquipesSortedByScore: state => state.equipes.sort((a, b) => b.score - a.score)
  },
  actions: {
    /**
     * sélecte une équipe par rapport à son id
     * @param id {number}
     */
    selectedEquipe(id) {
      return this.equipes.find(equipe => equipe.id === id)
    },
    addScore(score) {
      this.score += score
    },
    resetScore() {
      this.score = 0
    }
  }
})
