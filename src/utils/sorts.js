export const SORT_TYPE = {
  DATE: 0,
  ALPHABETICALLY: 1
}

export function sortAlphabetically (list, type, ascendant) {
  if (type === SORT_TYPE.ALPHABETICALLY) {
    if (ascendant) {
      return list.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
    } else {
      return list.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
    }
  }
  return list
}
