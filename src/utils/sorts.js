/* This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. */

export const SORT_TYPE = {
  DATE: 0,
  ALPHABETICALLY: 1
}

export function sortAlphabetically (list, type, ascendant) {
  switch (type) {
    case SORT_TYPE.ALPHABETICALLY:
      if (ascendant) {
        return list.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
      } else {
        return list.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
      }
    case SORT_TYPE.DATE:
      if (ascendant) {
        return list.sort((a, b) => a.created_at.getTime() - b.created_at.getTime())
      } else {
        return list.sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
      }
    default:
      return list
  }
}
