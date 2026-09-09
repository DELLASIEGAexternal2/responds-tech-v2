const KEYS = {
  USERS: 'responds_users_v2',
  FRAIS: 'responds_frais_v2',
  TACHES: 'responds_taches_v2'
}

export const getUsers = () => {
  const data = localStorage.getItem(KEYS.USERS)
  if (!data) {
    const defaults = [
      { username: 'Primo', password: '1234', role: 'admin', createdAt: new Date().toISOString() },
      { username: 'Mélissa', password: '1234', role: 'member', createdAt: new Date().toISOString() },
      { username: 'Brayan', password: '1234', role: 'member', createdAt: new Date().toISOString() }
    ]
    localStorage.setItem(KEYS.USERS, JSON.stringify(defaults))
    return defaults
  }
  return JSON.parse(data)
}
export const saveUsers = (users) => localStorage.setItem(KEYS.USERS, JSON.stringify(users))
export const getFrais = () => JSON.parse(localStorage.getItem(KEYS.FRAIS) || '[]')
export const saveFrais = (frais) => localStorage.setItem(KEYS.FRAIS, JSON.stringify(frais))
export const getTaches = () => JSON.parse(localStorage.getItem(KEYS.TACHES) || '[]')
export const saveTaches = (taches) => localStorage.setItem(KEYS.TACHES, JSON.stringify(taches))
