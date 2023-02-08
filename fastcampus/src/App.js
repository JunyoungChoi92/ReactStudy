import React from "react";
import { createGlobalStyle } from "styled-components";
import { TodoTemplate } from "./components/TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <div className="App">
      <GlobalStyle></GlobalStyle>
      <TodoTemplate>Hello!</TodoTemplate>
    </div>
  );
}

export default App;
