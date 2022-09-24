export default {
  getEnvHost () {
    const host = window.location.host
    if(host.includes('localhost')) {
      return "http://localhost:8080"
    }
  }
}