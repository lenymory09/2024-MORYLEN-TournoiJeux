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
        "name": "Equipe 1",
        "score": 1,
      },
      {
        "name": "Equipe 2",
        "score": 0,
      }
    ]
  },
  {
    id: 2,
    jeu: 1,
    equipes: [
      {
        "name": "Equipe 2",
        "score": 1,
      },
      {
        "name": "Equipe 3",
        "score": 1,
      }
    ]
  },
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
    },

    /**
     * @param state du magasin
     * @returns {*[]} la liste des noms des équipes
     */
    getNomsEquipes(state) {
      let listeNoms = []
      for (let equipe of state.equipes) {
        listeNoms.push(equipe.name)
      }
      return listeNoms
    },
  },
  actions: {
    /**
     * retourne l'équipe dont l'id est celui en paramètre
     * @param id {number} de l'équipe
     */
    selectEquipeById(id) {
      const equipeCourrante = this.equipes.find(equipe => equipe.id === id)
      if (equipeCourrante) {
        this.selectedEquipe = equipe
        return true
      } else {
        this.selectedEquipe = null
        return false
      }
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
      let equipeCourrant = this.equipes.find(equipe => equipe.id === id)
      if (equipeCourrant) {

        // chercher les matchs dont l'équipe en id joue
        let filteredMatchs = this.matchs.filter(match => match.equipes.some(equipeEl => equipeEl.name.toLowerCase() === equipeCourrant.name.toLowerCase()))

        for (let match of filteredMatchs) {
          // Recherche de l'index de l'équipe dans le match
          let indexEquipe = match.equipes.findIndex(equipe => equipe.name === equipeCourrant.name)
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

    /**
     * ajoute un match
     * @param match à ajouter
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    addMatch(match) {
      // teste si les équipes et les scores sont corrects
      for (let equipe of match.equipes) {
        // teste si l'équipe a été trouvé
        let equipeCourrante = this.equipes.find(equipeItem => equipeItem.name === equipe.name)

        // teste que les scores ne soit pas plus petit que 0
        if (equipe.score < 0) {
          return {success: false, message: `Le score de l'équipe ${equipe.name} ne peut pas etre plus petit que 0.`}
        }
      }

      // teste si les équipes sont différentes
      if (match.equipes[0].name === match.equipes[1].name) {
        return {success: false, message: "Les équipes qui s'affrontent ne peuvent pas être les mêmes."}
      }

      // si tout est bon on ajoute le match
      match.id = this.matchs[this.matchs.length - 1].id + 1
      this.matchs.push(match)
      return {success: true, message: "Le match a été ajouté avec succès."}
    },
  }
})
