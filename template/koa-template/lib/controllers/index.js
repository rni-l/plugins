import Model from './../model'

export const index = async () => {
  const { code, data } = await Model('select * from users')
  return data
}
