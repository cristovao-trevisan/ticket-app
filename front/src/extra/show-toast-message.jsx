import React from 'react'
import ButterToast, { Cinnamon } from 'butter-toast'

const getTheme = (type) => {
  switch (type) {
    case 'success': return Cinnamon.Crisp.SCHEME_GREEN
    case 'failure': return Cinnamon.Crisp.SCHEME_RED
    default: return Cinnamon.Crisp.SCHEME_DARK
  }
}

/**
 * @param {object} param0
 * @param {'success' | 'failure'} [param0.type]
 */
const showToastMessage = ({
  message,
  title,
  timeout = 6000,
  type,
}) => {
  ButterToast.raise({
    content: (
      <Cinnamon.Crisp
        scheme={getTheme(type)}
        content={() => <div>{ message }</div>}
        title={title}
      />
    ),
    timeout,
  })
}
window.showToastMessage = showToastMessage
export default showToastMessage
