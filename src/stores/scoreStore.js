import {defineStore} from "pinia"

const equipes = []
const jeuxVideos = []
const matchs = []

export const useScoreStore = defineStore('score', {
  state: () => ({
    equipes: [],
    matchs: [],
    jeuxVideos: [],
    selectedJeu: {},
    selectedMatch: {},
    selectedEquipe: {},
  }),
  getters: {
    /**
     * retourne les équipes triées par score
     */
    getEquipesSortedByScore: (state) => {
      const getPoints = (equipeId) => {
        let nbPoints = 0

        // teste si l'id existe
        const currentEquipe = state.equipes.find(equipe => equipe.id === equipeId)
        if (currentEquipe) {
          // chercher les matchs dont l'équipe en id joue
          let filteredMatchs = state.matchs.filter(match => match.equipes.some(equipeEl => equipeEl.name.toLowerCase() === currentEquipe.name.toLowerCase()))

          // Calcul des points de chaque match participé par l'équipe
          for (let match of filteredMatchs) {
            // Recherche de l'index de l'équipe dans le match
            let indexEquipe = match.equipes.findIndex(equipe => equipe.name === currentEquipe.name)
            if (indexEquipe !== -1) { // si l'équipe est trouvée

              // Teste si l'équipe a gagné
              if (match.equipes[indexEquipe].score > match.equipes[1 - indexEquipe].score) {
                nbPoints += 3;
                // Teste si l'équipe a fait égalité
              } else if (match.equipes[indexEquipe].score === match.equipes[1 - indexEquipe].score) {
                if (match.equipes[indexEquipe].score !== 0)
                  nbPoints += 1;
              }
            }
          }
        } else {
          return -1
        }
        return nbPoints
      }

      // Calcul des points
      const pointsMap = new Map()
      state.equipes.forEach((equipe) => {
        pointsMap.set(equipe.id, getPoints(equipe.id))
      })

      // Triage des équipes par points
      let sortedEquipes = state.equipes.slice().sort((a, b) => pointsMap.get(b.id) - pointsMap.get(a.id)) // Utilise this pour appeler l'action
      for (let index = 0; index < sortedEquipes.length; index++) {
        sortedEquipes[index].nbPoints = pointsMap.get(sortedEquipes[index].id)
      }
      console.log("équipes triées : ", JSON.stringify(sortedEquipes))
      return sortedEquipes
    },
  },
  actions: {
    /**
     * retourne le match dont l'id est celui en paramètre
     * @param id du match
     * @returns vrai si le match existe et faux sinon
     */
    selectMatchById(id) {
      // recherche l'index du match
      const matchCourrant = this.matchs.find(match => match.id === id)
      if (matchCourrant) {
        console.log("Recherche de l'index du match...")
        this.selectedMatch = matchCourrant
        return true
      } else {
        this.selectedMatch = null
        return false
      }
    }
    ,
  }
})
