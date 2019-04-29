import { MdHome, MdEventSeat } from 'react-icons/md'

export default [{
  title: 'Home',
  component: () => import('./components/home/Home'),
  icon: MdHome,
  path: '/',
}, {
  title: 'Seat Map',
  component: () => import('./components/seat-selection/SeatSelection'),
  icon: MdEventSeat,
  path: '/seatmap',
}]
