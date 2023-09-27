import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import "rsuite/dist/rsuite.min.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const isDarkModePreferred = localStorage.getItem('darkModePreference') === 'true';

const rootElement = document.getElementById('root');
rootElement?.classList.add(isDarkModePreferred ? 'dark' : 'light');

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

