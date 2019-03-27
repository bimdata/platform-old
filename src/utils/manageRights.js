export function hasAdminRole (role) {
  if (role === 100) {
    return true
  }
  return false
}

export function hasUserRole (role) {
  if (role >= 50) {
    return true
  }
  return false
}
