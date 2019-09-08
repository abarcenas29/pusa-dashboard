export const userLinks = role => {
  switch (role) {
    case 'admin':
      return '/users'
    case 'owner':
      return '/employees'
    default:
      return null
  }
}

export const orgLinks = role => {
  switch (role) {
    case 'admin':
      return '/organizations'
    case 'owner':
      return '/organizations/name-of-organization'
    default:
      return null
  }
}
