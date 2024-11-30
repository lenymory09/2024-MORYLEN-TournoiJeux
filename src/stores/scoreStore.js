import {defineStore} from "pinia";

const equipes = [
  {
    id: 1,
    name: "Equipe 1",
  },
  {
    id: 2,
    name: "Equipe 2",
  }
]

const jeuxVideos = [
  {
    id: 1,
    name: "Rocket league"
  },
  {
    id: 2,
    name: "call of duty"
  }
]

const matchs = [{
  id: 1,
  jeu: "",
  equipes : [
    {
      "equipe": 1,
      "score": 0,
    },
    {
      "equipe": 2,
      "score": 0,
    }
  ]
}]

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
  }
})
