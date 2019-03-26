export const rights = {
  100: { text: this.$t('users.administrator'), value: 100 },
  50: { ltext: this.$t('users.user'), value: 50 },
  25: { text: this.$t('users.guest'), value: 25 }
}

export const mappingRights = (role) => {
  let searchedPriority = role ? rights[role] : undefined
  if (searchedPriority === undefined) {
    return { text: '', value: '' }
  }

  return searchedPriority
}