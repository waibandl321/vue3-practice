import { Auth } from 'aws-amplify'
export default {
  async signout () {
    return await Auth.signOut()
  },
  async emailSignIn (email, password) {
    return await Auth.signIn(email, password)
  }
}