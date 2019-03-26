import fr from '@/lang/fr'

export const rights = {
  100: { text: fr.users.administrator, value: 100 },
  50: { text: fr.users.user, value: 50 },
  25: { text: fr.users.guest, value: 25 }
}

export const mappingRights = (role) => {
  let searchedPriority = role ? rights[role] : undefined
  if (searchedPriority === undefined) {
    return { text: '', value: '' }
  }

  return searchedPriority
}

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
