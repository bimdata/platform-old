import { UserRepository } from '@/api/UserRepository'

export const fetchUserData = async ({commit}) => {
  try {
    const UserRepositoryRequest = new UserRepository()
    const response = await UserRepositoryRequest.getMyUserData()
    commit('SET_USER_DATA', response)
    return response
  } catch (e) {
    console.log(e)
  }
}
