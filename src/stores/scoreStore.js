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
  equipes: [
    {
      "id": 1,
      "score": 0,
    },
    {
      "id": 2,
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

    /**
     * obtenir le nombre de points
     * @param id de l'équipe
     */
    getPoints(id) {
      let nbPoints = 0

      // teste si l'id existe
      if (equipes.find(equipe => equipe.id === id)) {

        // chercher les matchs dont l'équipe en id joue
        let filteredMatchs = matchs.filter(match => match.equipes.some(equipe => equipe.id === id))

        for (let match of filteredMatchs) {
          // Recherche de l'index de l'équipe dans le match
          let indexEquipe = match.equipes.findIndex(equipe => equipe.id === id)
          console.log("index de l'équipe : " + indexEquipe)
          if (indexEquipe !== -1) {
            if (match.equipes[indexEquipe].score > match.equipes[!indexEquipe].score) {
              nbPoints += 3
            } else if (match.equipes[indexEquipe].score === match.equipes[indexEquipe].score) {
              nbPoints += 1
            }
          }
        }
      } else {
        return -1
      }
    }
  }
})
