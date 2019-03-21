import { getCookie } from '../utils/helpers'

export default {
  isLoggedIn: !!getCookie('token'),
  firstName: 'Lasse',
  lastName: 'Kongo',
  age: 29,
}
