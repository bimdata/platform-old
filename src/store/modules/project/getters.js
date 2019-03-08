import _ from 'lodash'

function setFoldersTree (folder, folders) {
  const children = folders.filter(item => item.parent_id === folder.id)

  return {
    ...folder,
    children: children.length
      ? children.map(
        child => setFoldersTree(child, folders)
      )
      : null
  }
}

function flattenFolders (list, acc = []) {
  const folders = list.filter(item => item.type === 'Folder')
  let arr = [ ...acc, ...folders ]

  folders.forEach(folder => {
    arr = folder.children ? flattenFolders(folder.children, arr) : arr
  })

  return arr
}

export default {
  getIfcElements: state => idIfc => {
    if (state.elements) {
      return state.elements.find(element => {
        return parseInt(idIfc) === element.ifc
      })
    }
  },
  getSortedIfc: (state) => {
    return _.sortBy(state.ifcs, ['updated_at'])
  },
  getMainIfc: (state) => {
    if (state.ifcs === null) {
      return null
    }

    let completedIfc = state.ifcs.filter(ifc => ifc.status === 'C')
    return _.sortBy(completedIfc, ['updated_at']).reverse()[0]
  },
  getCurrentChildren: state => {
    return (state.currentElement !== null) ? state.currentElement.children : null
  },

  folders: state => {
    if (!state.tree) return null

    const { children, ...rest } = state.tree

    const folders = flattenFolders(children, [{ ...rest }])

    const foldersTree = folders
      .filter(folder => !folder.parent_id)
      .map(folder => setFoldersTree(folder, folders))

    return foldersTree
  },
  users: state => state.users,
  guests: state => state.guests
}
