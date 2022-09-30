import { Auth } from 'aws-amplify'
export default {
  async signout () {
    await Auth.signOut()
  }
}