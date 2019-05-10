import firebase from 'firebase/app'
import 'firebase/auth'
import React, { Component } from 'react'
import base, { firebaseApp } from '../base'
import AdminForm from './AdminForm'
import AjouterRecette from './AjouterRecette'
import Login from './Login'

class Admin extends Component {
  state = {
    uid: null,
    chef: null,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.handleAuth({ user })
      }
    })
  }

  handleAuth = async authData => {
    const box = await base.fetch(this.props.pseudo, { context: this })

    if (!box.chef) {
      await base.post(`${this.props.pseudo}/chef`, {
        data: authData.user.uid,
      })
    }

    this.setState({
      uid: authData.user.uid,
      chef: box.chef || authData.user.uid,
    })
  }

  authenticate = () => {
    const authProvider = new firebase.auth.FacebookAuthProvider()
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.handleAuth)
  }

  logout = async () => {
    console.log('deconnexion')
    await firebase.auth().signOut()
    this.setState({ uid: null })
  }

  render() {
    const {
      recettes,
      ajouterRecette,
      majRecette,
      chargerExemple,
      supprimerRecette,
    } = this.props

    // sim lutilisateur nest pas connecter
    const Logout = <button onClick={this.logout}>Deconnexion</button>

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />
    }

    if (this.state.uid !== this.state.chef) {
      return (
        <div>
          <p>Tu n'est pas le chef de cette page.'</p>
          {Logout}
        </div>
      )
    }
    return (
      <div className='cards'>
        <AjouterRecette ajouterRecette={ajouterRecette} />
        {Object.keys(recettes).map(key => (
          <AdminForm
            majRecette={majRecette}
            key={key}
            id={key}
            supprimerRecette={supprimerRecette}
            recettes={recettes}
          />
        ))}
        <footer>
          {Logout}
          <button onClick={chargerExemple}>Remplir</button>
        </footer>
      </div>
    )
  }
}

export default Admin
