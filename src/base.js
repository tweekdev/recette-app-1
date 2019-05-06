import firebase from 'firebase/app'
import 'firebase/database'
import Rebase from 're-base'

const firebaseApp = firebase.initializeApp({
  //key
  apiKey: 'xxx',
  authDomain: 'xxx',
  databaseURL: 'xxx',
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
