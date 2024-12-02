import {defineStore} from "pinia";
import router from "@/router";

const equipes = [
  {
    id: 1,
    name: "Equipe 1",
  },
  {
    id: 2,
    name: "Equipe 2",
  },
  {
    id: 3,
    name: "Equipe 3",
  },
  {
    id: 4,
    name: "Equipe 4",
  },
  {
    id: 5,
    name: "Equipe 5",
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

const matchs = [
  {
    id: 1,
    jeu: 1,
    equipes: [
      {
        "id": 1,
        "score": 1,
      },
      {
        "id": 2,
        "score": 0,
      }
    ]
  },
  {
    id: 2,
    jeu: 1,
    equipes: [
      {
        "id": 1,
        "score": 1,
      },
      {
        "id": 3,
        "score": 1,
      }
    ]
  },
  {
    id: 3,
    jeu: 1,
    equipes: [
      {
        "id": 1,
        "score": 1,
      },
      {
        "id": 4,
        "score": 2,
      }
    ]
  },
  {
    id: 4,
    jeu: 1,
    equipes: [
      {
        "id": 1,
        "score": 1,
      },
      {
        "id": 5,
        "score": 3,
      }
    ]
  },
  {
    id: 5,
    jeu: 1,
    equipes: [
      {
        "id": 2,
        "score": 1,
      },
      {
        "id": 3,
        "score": 1,
      }
    ]
  },
  {
    id: 6,
    jeu: 1,
    equipes: [
      {
        "id": 2,
        "score": 1,
      },
      {
        "id": 4,
        "score": 2,
      }
    ]
  },
  {
    id: 7,
    jeu: 1,
    equipes: [
      {
        "id": 2,
        "score": 1,
      },
      {
        "id": 5,
        "score": 3,
      }
    ]
  },
  {
    id: 8,
    jeu: 1,
    equipes: [
      {
        "id": 3,
        "score": 1,
      },
      {
        "id": 4,
        "score": 2,
      }
    ]
  },
  {
    id: 9,
    jeu: 1,
    equipes: [
      {
        "id": 3,
        "score": 1,
      },
      {
        "id": 5,
        "score": 3,
      }
    ]
  },
  {
    id: 10,
    jeu: 1,
    equipes: [
      {
        "id": 4,
        "score": 1,
      },
      {
        "id": 5,
        "score": 3,
      }
    ]
  },
  {
    id: 11,
    jeu: 2,
    equipes: [
      {
        "id": 1,
        "score": 1,
      },
      {
        "id": 2,
        "score": 0,
      }
    ]
  },
  {
    id: 12,
    jeu: 2,
    equipes: [
      {
        "id": 1,
        "score": 1,
      },
      {
        "id": 3,
        "score": 1,
      }
    ]
  }
]

export const useScoreStore = defineStore('scoreStore', {
  state: () => ({
    equipes,
    matchs,
    jeuxVideos,
    selectedJeu: {},
    selectedMatch: {},
    selectedEquipe: {},
  }),
  getters: {
    /**
     * retourne les équipes triées par score
     */
    getEquipesSortedByScore(state) {
      return state.equipes
        .slice()
        .sort((a, b) => this.getPoints(b.id) - this.getPoints(a.id)); // Utilise this pour appeler l'action
    }
  },
  actions: {
    /**
     * sélecte une équipe par rapport à son id
     * @param id {number}
     */
    selectEquipe(id) {
      this.selectedEquipe = this.equipes.find(equipe => equipe.id === id)
    },

    // todo : créer une action pour charger les données depuis une api

    /**
     * retourne le match dont l'id est celui en paramètre
     * @param id du match
     * @returns {{equipes: [{score: number, id: number},{score: number, id: number}], id: number, jeu: number}}
     */
    selectMatch(id) {
      this.selectedMatch = this.matchs.find(match => match.id === id)
    },

    /**
     * retourne le jeu passé en parametre
     * @param id du jeu
     * @returns {{name: string, id: number} | {name: string, id: number}}
     */
    selectJeu(id) {
      this.selectedJeu = this.jeuxVideos.find(jeu => jeu.id === id)
    },

    /**
     * obtenir le nombre de points
     * @param id de l'équipe
     */
    getPoints(id) {
      let nbPoints = 0

      // teste si l'id existe
      if (this.equipes.find(equipe => equipe.id === id)) {

        // chercher les matchs dont l'équipe en id joue
        let filteredMatchs = this.matchs.filter(match => match.equipes.some(equipe => equipe.id === id))

        for (let match of filteredMatchs) {
          // Recherche de l'index de l'équipe dans le match
          let indexEquipe = match.equipes.findIndex(equipe => equipe.id === id)
          console.log("index de l'équipe : " + indexEquipe)
          if (indexEquipe !== -1) { // si l'équipe est trouvée

            // Teste si l'équipe a gagné
            if (match.equipes[indexEquipe].score > match.equipes[indexEquipe === 0 ? 1 : 0].score) {
              nbPoints += 3

              // Teste si l'équipe a fait égalité
            } else if (match.equipes[indexEquipe].score === match.equipes[indexEquipe === 0 ? 1 : 0].score) {
              nbPoints += 1
            }
          }
        }
      } else {
        return -1
      }
      return nbPoints
    },

    /**
     * ajoute une équipe
     * @param equipe {Object}
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    addEquipe(equipe) {
      if (!equipe.name) {
        return {success: false, message: "Le nom ne peut pas être vide"}
      }
      equipe.id = this.equipes[this.equipes.length - 1].id + 1
      this.equipes.push(equipe)
      return {success: true, message: "L'équipe a été ajoutée avec succès"}
    },

    addMatch(match) {
      this.selectJeu(match.jeu)
      if (!this.selectedJeu){
        return {success: false, message: "Le jeu n'existe pas"}
      }

      for (let index = 0; index < 2; index++) {
        // teste si les équipes existent
        this.selectEquipe(match.equipes[index].id)
        if (!this.selectedEquipe) {
          return {success: false, message: `\`L'équipe ${index + 1} n'existe pas.`}
        }

        // teste que les scores ne soit pas plus petit que 0
        if (match.equipes[index].score < 0) {
          return {success: false, message: `\`Le score ${index + 1} ne peut pas etre plus petit que 0.\``}
        }
      }

      if (match.equipes[0].id === match.equipes[1].id){
        return {success: false, message: "Les équipes qui s'affrontent ne peuvent pas être les mêmes."}
      }

      this.matchs.push(match)
      return { success: true, message: "Le match a été ajouté avec succès."}
    }
  }
})
