import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChatProvider, WidgetProvider } from './context/'

ReactDOM.createRoot(document.getElementById('chat_wrapper')!).render(
  // <React.StrictMode>
  <ChatProvider>
    <WidgetProvider>
      <App />
    </WidgetProvider>
  </ChatProvider>
  // </React.StrictMode>
)
