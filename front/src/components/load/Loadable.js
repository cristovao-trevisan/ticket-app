import loadable from 'react-loadable'
import { FullLoader } from './Loader'

const Loadable = component => loadable({
  loader: component,
  loading: FullLoader,
})

export default Loadable
