import * as React from "react";
import * as ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: process.env.SERVER_URL
});


import { Hello } from "./components/Hello";

ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById("root")
);