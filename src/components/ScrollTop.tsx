import React from 'react'
import { RouteComponentProps } from '@reach/router'

const ScrollToTop: React.FC<RouteComponentProps> = ({ children }: any) => {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  })
  return children
}

export default ScrollToTop
