export function hasAdminRole (role) {
  return (role === 100)
}

export function hasUserRole (role) {
  return (role >= 50)
}
