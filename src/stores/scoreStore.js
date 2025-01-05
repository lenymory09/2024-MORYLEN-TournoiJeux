import {defineStore} from "pinia"
import axios from 'axios'
import {v4 as uuidv4} from 'uuid' // Librairie pour générer des identifiants uniques (UUID).

/*const equipes = [
  {
    id: '1',
    name: "Equipe 1",
  },
  {
    id: '2',
    name: "Equipe 2",
  },
  {
    id: '3',
    name: "Equipe 3",
  },
  {
    id: '4',
    name: "Equipe 4",
  },
  {
    id: '5',
    name: "Equipe 5",
  }
]*/

const jeuxVideos = [
  {
    id: '1',
    name: "Street fighter"
  },
  {
    id: '2',
    name: "Call of duty : Black ops 6"
  },
  {
    id: '3',
    name: "Mario kart 8 Deluxe",
  }
]
/*
const matchs = [
  {
    id: '1',
    jeu: 1,
    equipes: [
      {
        name: "Equipe 1",
        score: 1,
      },
      {
        name: "Equipe 2",
        score: 0,
      }
    ]
  },
  {
    id: '2',
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
*/
export const useScoreStore = defineStore('score', {
  state: () => ({
    equipes: [],
    matchs: [],
    jeuxVideos,
    selectedJeu: {},
    selectedMatch: {},
    selectedEquipe: {},
    apiUrl: 'http://localhost:8080', // URL de base pour accéder à l'API
    isLoading: false,
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

    /**
     * @param state du magasin
     * @returns {*[]} la liste des noms des équipes
     */
    getNomsEquipes: (state) => {
      let listeNoms = []
      for (let equipe of state.equipes) {
        listeNoms.push(equipe.name)
      }
      return listeNoms
    },
  },
  actions: {

    /**
     * Récupère la liste des équipes depuis le localStorage
     */
    loadEquipes() {
      this.equipes = JSON.parse(localStorage.getItem('equipes')) || []
    },

    loadMatchs() {
      this.matchs = JSON.parse(localStorage.getItem('matchs')) || []
    },

    /**
     * retourne l'équipe dont l'id est celui en paramètre
     * @param id {String} de l'équipe
     * @returns true si l'équipe existe et false sinon
     */
    selectEquipeById: (id) => {
      const equipeCourrante = this.equipes.find(equipe => equipe.id === id)
      if (equipeCourrante) {
        this.selectedEquipe = equipeCourrante
        return true
      } else {
        this.selectedEquipe = null
        return false
      }
    },

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
    },

    /**
     * retourne le jeu passé en parametre
     * @param id du jeu
     * @returns {{name: string, id: number} | {name: string, id: number}}
     */
    selectJeuById(id) {
      this.selectedJeu = this.jeuxVideos.find(jeu => jeu.id === id)
    },

    /**
     * obtenir le nombre de points
     * @param id de l'équipe
     * @returns nombre de points
     */
    getPoints(id) {
      let nbPoints = 0

      // teste si l'id existe
      let equipeExiste = this.selectEquipeById(id)
      if (equipeExiste) {
        // console.log(`L'equipe ${this.selectedEquipe.name} existe`)
        // chercher les matchs dont l'équipe en id joue
        let filteredMatchs = this.matchs.filter(match => match.equipes.some(equipeEl => equipeEl.name.toLowerCase() === this.selectedEquipe.name.toLowerCase()))
        // console.log("matchs triés : ", JSON.stringify(filteredMatchs))

        // Calcule des points
        for (let match of filteredMatchs) {
          // Recherche de l'index de l'équipe dans le match
          let indexEquipe = match.equipes.findIndex(equipe => equipe.name === this.selectedEquipe.name)
          if (indexEquipe !== -1) { // si l'équipe est trouvée

            // Teste si l'équipe a gagné
            if (match.equipes[indexEquipe].score > match.equipes[1 - indexEquipe].score) {
              nbPoints += 3;
              // Teste si l'équipe a fait égalité
            } else if (match.equipes[indexEquipe].score === match.equipes[1 - indexEquipe].score) {
              nbPoints += 1;
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
     * @param equipe {Object} à ajouter
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    addEquipe(equipe) {
      if (!equipe.name) {
        console.log("Le nom ne peut pas être vide")
        return {success: false, message: "Le nom ne peut pas être vide"}
      }

      if (this.equipes.some(equipeEl => equipeEl.name.toLowerCase() === equipe.name.toLowerCase())) {
        console.log("L'équipe existe déjà")
        return {success: false, message: "L'équipe existe déjà"}
      }

      // Ajout d'un id à l'équipe
      equipe.id = uuidv4()

      this.equipes.push(equipe)

      // Enregistrement des équipes dans le localStorage
      localStorage.setItem('equipes', JSON.stringify(this.equipes))

      return {success: true, message: "L'équipe a été ajoutée avec succès"}
    },

    /**
     * check si le match est correct
     * @param match à checker
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    checkMatch(match) {
      // teste si les équipes et les scores sont corrects
      for (let equipe of match.equipes) {
        // teste si le nom de l'équipe est vide
        if (!equipe.name) {
          return {success: false, message: "Les équipes ne peuvent pas être vides"}
        }

        // teste que les scores ne soit pas plus petit que 0
        if (equipe.score < 0) {
          return {success: false, message: `Le score de l'équipe ${equipe.name} ne peut pas etre plus petit que 0.`}
        }
      }

      // teste si les équipes sont différentes
      if (match.equipes.at(0).name === match.equipes.at(1).name) {
        return {success: false, message: "Les équipes qui s'affrontent ne peuvent pas être les mêmes."}
      }

      // Teste si le jeu n'est pas vide
      if (!match.jeu) {
        return {success: false, message: "Le jeu ne peut pas être vide"}
      }

      return {success: true, message: "Le match est correct"}
    },

    /**
     * ajoute un match
     * @param match à ajouter
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    addMatch(match) {
      const checkMatch = this.checkMatch(match)

      // Check des données
      if (!checkMatch.success) {
        return checkMatch
      }

      // Initialise le score à 0 si pas inséré
      if (!match.equipes[0].score) {
        match.equipes[0].score = 0
      }
      if (!match.equipes[1].score) {
        match.equipes[1].score = 0
      }

      match.id = uuidv4()

      this.matchs.push(match)

      // Enregistrement des matchs dans le localStorage
      localStorage.setItem('matchs', JSON.stringify(this.matchs))

      return {success: true, message: "Match ajouté avec succès !"}
    },

    /**
     * modifie le score d'un match
     * @param nouveauScore nouveau match
     * @param id du match à mofifier
     */
    modifierScore(nouveauScore, id) {

      if (!nouveauScore.score1 === null || !nouveauScore.score2 === null ||
        !nouveauScore.score1 === undefined || !nouveauScore.score2 === undefined) {
        return {success: false, message: "Les scores ne peuvent pas être vides."}
      }

      // Envoie de la requête à l'API
      // Recherche de l'index du match
      let indexMatch = this.matchs.findIndex(match => match.id === id)
      console.log("Index du match : ", indexMatch)
      if (indexMatch !== -1) {
        // Modification du score localement dans le store
        this.matchs[indexMatch].equipes[0].score = nouveauScore.score1
        this.matchs[indexMatch].equipes[1].score = nouveauScore.score2
      } else {
        console.log("Match non trouvé")
      }

      return {success: true, message: "Le score a été modifié avec succès."}
    },

    /**
     * @param name nom de l'équipe
     */
    getIdEquipeByName(name) {
      // cherche l'id de l'équipe avec le nom passé en parametre.
      return this.equipes.find(equipe => equipe.name === name).id
    },

    /**
     * Supprime une équipe
     * @param id de l'équipe à supprimer
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    deleteEquipe(id) {
      // Recherche de l'index de l'équipe
      let indexEquipe = this.equipes.findIndex(equipe => equipe.id === id)

      // Supprime tous les matchs de l'équipe
      for (let currentMatch of this.matchs.filter(match => match.equipes.some(equipe => equipe.name === this.equipes[indexEquipe].name))) {
        this.deleteMatch(currentMatch.id)
      }

      if (indexEquipe !== -1) {
        console.log("Suppression de l'équipe localement...")
        this.equipes.splice(indexEquipe, 1)

        // Enregistrement des équipes dans le localStorage
        localStorage.setItem('equipes', JSON.stringify(this.equipes))
      }


      return {success: true, message: "L'équipe a été supprimée avec succès."}
    },

    /**
     * Supprime un match
     * @param id du match à supprimer
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    deleteMatch(id) {
      // Recherche de l'index du match
      let indexMatch = this.matchs.findIndex(match => match.id === id)
      if (indexMatch !== -1) {
        console.log("Suppression du match localement...")
        this.matchs.splice(indexMatch, 1)

        // Enregistrement des matchs dans le localStorage
        localStorage.setItem('matchs', JSON.stringify(this.match))
      }

      return {success: true, message: "Le match a été supprimé avec succès"}
    }
  },
})
