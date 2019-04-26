import loadable from 'react-loadable'
import Loader from './Loader'

const Loadable = component => loadable({
  loader: component,
  loading: Loader,
})

export default Loadable
