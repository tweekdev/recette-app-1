import firebase from 'firebase/app'
import 'firebase/database'
import Rebase from 're-base'

const firebaseApp = firebase.initializeApp({
  //key
  apiKey: 'AIzaSyClDcu0HRsK3heVcXa5aCJQhoaVNfAUnS4',
  authDomain: 'recettes-app-3bdea.firebaseapp.com',
  databaseURL: 'https://recettes-app-3bdea.firebaseio.com',
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
