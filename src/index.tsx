import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import App from "./App";
import { customTheme, resolver } from "./theme";
import { Notifications } from "@mantine/notifications";

const apiUrl = import.meta.env.PROD
  ? import.meta.env.PUBLIC_PROD_API_URL
  : import.meta.env.PUBLIC_LOCAL_API_URL;

const client = new ApolloClient({
  uri: apiUrl,
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MantineProvider
      theme={customTheme}
      cssVariablesResolver={resolver}
      forceColorScheme="light"
    >
      <ApolloProvider client={client}>
        <Notifications autoClose={3000} />
        <App />
      </ApolloProvider>
    </MantineProvider>
  </React.StrictMode>
);
