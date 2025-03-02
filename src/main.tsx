import React from "react"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {client} from "@/apollo/client.ts";
import {ApolloProvider} from "@apollo/client";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
)
