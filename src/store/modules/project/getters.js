import _ from 'lodash'

export const getIfcElements = state => idIfc => {
  return state.elements.find(element => {
    return parseInt(idIfc) === element.ifc
  })
}

export const getSortedIfc = (state) => {
  return _.sortBy(state.ifcs, ['updated_at']).reverse()
}

export const getMainIfc = (state) => {
  let completedIfc = state.ifcs.filter(ifc => ifc.status === 'C')
  return _.sortBy(completedIfc, ['created_at'])[0]
}
