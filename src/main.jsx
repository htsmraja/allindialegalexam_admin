import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./assets/scss/app.scss";
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Redux/Store.jsx'
import "react-datepicker/dist/react-datepicker.css";
import { AuthProvider } from './helper/AuthProvider.jsx'
import { CommonProvider } from './helper/CommonProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AuthProvider>
          <CommonProvider>
            <App />
          </CommonProvider>
        </AuthProvider>
      </Provider>
    </HashRouter>
  </StrictMode>,
)
