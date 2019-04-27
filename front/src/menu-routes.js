import { MdHome } from 'react-icons/md'

export default [{
  title: 'Home',
  component: () => import('./components/seat-selection/SeatSelection'),
  icon: MdHome,
  path: '/',
}]
