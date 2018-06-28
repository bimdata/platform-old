import UserRepository from '@/api/UserRepository'

export const fetchUserData = async ({commit}) => {
  try {
    const response = await UserRepository.getMyUserData()
    commit('SET_USER_DATA', response)
    return response
  } catch (e) {
    console.log(e)
  }
}
