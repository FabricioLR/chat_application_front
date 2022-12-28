import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './context/userContext'
import { Provider } from "react-redux"
import store from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
)
