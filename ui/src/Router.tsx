import { MemoryRouter, BrowserRouter } from 'react-router-dom'

interface RouterProps {
  children: React.ReactNode
}

export function Router(props: RouterProps): JSX.Element {
  const { children } = props
  const __DEV__ = process.env.REACT_APP__DEV__

  if (__DEV__) {
    return <BrowserRouter>{children}</BrowserRouter>
  }

  return <MemoryRouter>{children}</MemoryRouter>
}

export default Router
