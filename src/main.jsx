import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import ModeProvider from '../src/contexts/ModeContext';
import UsedBtnProvider from './contexts/UsedBtnContext';
import SearchProvider from './contexts/SearchContext';
import './tailwind.css';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <ModeProvider> */}
    <UsedBtnProvider>
      <SearchProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SearchProvider>
    </UsedBtnProvider>
    {/* </ModeProvider> */}
  </StrictMode>,
)
