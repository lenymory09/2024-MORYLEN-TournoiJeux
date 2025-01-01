import {defineStore} from "pinia"
import axios from 'axios'

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
    name: "BO6"
  }
]

const matchs = [
  {
    id: 1,
    jeu: 1,
    equipe: [
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
    apiUrl: 'http://localhost:3000', // URL de base pour accéder à l'API
    isLoading: false,
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
        this.selectedEquipe = equipeCourrante
        return true
      } else {
        this.selectedEquipe = null
        return false
      }
    },

    /**
     * Charge les équipes depuis l'API
     * @returns {Promise<void>} les équipes de l'api
     */
    async fetchEquipes() {
      this.isLoading = true
      try {
        const response = await axios.get(`${this.apiUrl}/equipes`)
        this.equipes = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des équipes :', error)
      } finally {
        this.isLoading = false
      }
    },

    /**
     * charge les jeux depuis l'API
     * @returns {Promise<void>} les jeux de l'api
     */
    async fetchJeux() {
      this.isLoading = true
      try {
        const response = await axios.get(`${this.apiUrl}/jeux`)
        this.jeuxVideos = response.data
      } catch (error) {
        console.error('Erreur lors du chargement des jeux :', error)
      } finally {
        this.isLoading = false
      }
    },

    /**
     * charge les matchs dans l'API
     * @returns {Promise<void>}
     */
    async fetchMatchs() {
      this.isLoading = true
      try {
        const response = await axios.get(`${this.apiUrl}/matchs`)
          .then(response => {
            this.matchs = response.data
          })
      } catch (error) {
        console.error("Erreur dans le chargement des matchs :", error)
      } finally {
        this.isLoading = false
      }
    },

    /**
     * retourne le match dont l'id est celui en paramètre
     * @param id du match
     * @returns {{equipes: [{score: number, id: number},{score: number, id: number}], id: number, jeu: number}}
     */
    selectMatchById(id) {

      // recherche l'index du match
      const matchCourrant = this.matchs.find(match => match.id === id)
      if (matchCourrant) {
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
     */
    getPoints(id) {
      let nbPoints = 0

      // teste si l'id existe
      let equipeExiste = this.selectEquipeById(id)
      if (equipeExiste) {
        // chercher les matchs dont l'équipe en id joue
        let filteredMatchs = this.matchs.filter(match => match.equipes.some(equipeEl => equipeEl.name.toLowerCase() === this.selectedEquipe.name.toLowerCase()))

        for (let match of filteredMatchs) {
          // Recherche de l'index de l'équipe dans le match
          let indexEquipe = match.equipes.findIndex(equipe => equipe.name === equipeCourrant.name)
          console.log("index de l'équipe : " + indexEquipe)
          if (indexEquipe !== -1) { // si l'équipe est trouvée

            // Teste si l'équipe a gagné
            // todo utiliser bool pour alterner les équipes
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
     * @param equipe {Object} à ajouter
     * @returns {{success: boolean, message: string}} retourne un message de succès ou d'erreur
     */
    addEquipe(equipe) {
      if (!equipe.name) {
        return {success: false, message: "Le nom ne peut pas être vide"}
      }
      // todo ajouter la requête à l'API
      /*try {
        const response = await axios.post(`${this.apiUrl}/equipes`, equipe)
        this.equipes.push(response.data)
        return {success: true, message: "L'équipe a été ajoutée avec succès"}
      } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'équipe :', error)
        return {success: false, message: "Erreur lors de l'ajout de l'équipe"}
      }*/
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
        // teste si le nom de l'équipe est vide
        if (!equipe.name) {
          return { success: false, message: "Les équipes ne peuvent pas être vides" }
        }

        // teste que les scores ne soit pas plus petit que 0
        if (equipe.score < 0) {
          return { success: false, message: `Le score de l'équipe ${equipe.name} ne peut pas etre plus petit que 0.` }
        }
      }

      // teste si les équipes sont différentes
      if (match.equipes[0].name === match.equipes[1].name) {
        return {success: false, message: "Les équipes qui s'affrontent ne peuvent pas être les mêmes."}
      }

      // Initialise le score à 0 si pas inséré
      if (!match.equipes[0].score) {
        match.equipes[0].score = 0
      }
      if (!match.equipes[1].score) {
        match.equipes[1].score = 0
      }

      // si tout est bon on ajoute le match
      this.matchs.push(match)
      return {success: true, message: "Le match a été ajouté avec succès."}
    },

    /**
     * modifie le score d'un match
     * @param matchModifie nouveau match
     * @param id du match
     */
    modifierScore(id, matchModifie) {
      // Recherche de l'index du match
      let indexMatch = this.matchs.findIndex(match => match.id === id)

      // Envoie de la requête à l'API
      // try {
      //   const response = await axios.put(`${this.apiUrl}/matchs/${id}`, matchModifie)
      // } catch (e) {
      //   console.error("Erreur dans la modification du score : ", e)
      // }

      // Modification du score localement dans le store
      if (indexMatch !== -1) {
        // this.matchs[indexMatch].equipes = resultat
        this.matchs[indexMatch] = matchModifie
      }
    },
  }
})
