import { MdHome, MdShoppingCart } from 'react-icons/md'

export default [{
  title: 'Home',
  component: () => import('./components/home/Home'),
  icon: MdHome,
  path: '/',
}, {
  title: 'Cart',
  component: () => import('./components/cart/Cart'),
  icon: MdShoppingCart,
  path: '/cart',
}]
