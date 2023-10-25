import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@mantine/core/styles.css";

import App from "./App";
import { customTheme, resolver } from "./theme";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_LOCAL_API_URL;

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider theme={customTheme} cssVariablesResolver={resolver}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
);
