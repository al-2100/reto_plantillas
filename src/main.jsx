import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
      theme={{
        globalStyles: (theme) => ({
          body: {
            maxWidth: '1600px',
            margin: '0 auto',
          },
        }),
      }}
    >
      <App />
    </MantineProvider>
  </StrictMode>,
)
