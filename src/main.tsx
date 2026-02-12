import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { subscribe } from './store'

const rootElement = document.getElementById('root')

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  const render = () => root.render(<App />)

  window.addEventListener('hashchange', render)
  subscribe(render)

  if (!window.location.hash) {
    window.location.hash = '/'
  }

  render()
}
