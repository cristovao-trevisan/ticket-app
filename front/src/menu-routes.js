import { MdHome } from 'react-icons/md'

export default [{
  title: 'Home',
  component: () => import('./components/home/Home'),
  icon: MdHome,
  path: '/',
}]
