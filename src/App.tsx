import './App.css'
import NotePage from "@/pages/NotePage.tsx";
import {ApolloProvider} from "@apollo/client";
import {client} from "@/apollo/client.ts";

function App() {

    return (
        <ApolloProvider client={client}>
            <NotePage/>
        </ApolloProvider>
    )
}

export default App
