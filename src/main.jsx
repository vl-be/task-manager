import React from 'react'
import ReactDOM from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntdApp, ConfigProvider } from 'antd'; 

import enGB from 'antd/locale/en_GB';
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={enGB}>
        
        <AntdApp>
          <App />
        </AntdApp>

      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)