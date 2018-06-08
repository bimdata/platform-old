export default {
  UPDATE_USERNAME (state, value) { state.username.value = value },
  UPDATE_PASSWORD (state, value) { state.password.value = value },
  ADD_ERROR_FIELD (state, {field, message}) {
    state[field].errors.push(message)
    state.hasErrors = true
  },
  ADD_ERROR_GLOBAL (state, {field, message}) {
    state.globalErrors.push(message)
    state.hasErrors = true
  },
  RESET_ERRORS (state) {
    state.username.errors = []
    state.password.errors = []
    state.globalErrors = []
    state.hasErrors = false
  }
}
