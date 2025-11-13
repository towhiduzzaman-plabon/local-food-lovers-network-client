import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';
import './styles/index.css';
import AuthProvider from './context/AuthProvider';
import QueryProvider from './providers/QueryProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<QueryProvider>
<AuthProvider>
<RouterProvider router={Router} />
</AuthProvider>
</QueryProvider>
</React.StrictMode>
);