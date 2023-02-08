import React from "react";
import { createGlobalStyle } from "styled-components";
import { TodoTemplate } from "./components/TodoTemplate";
import { TodoHead } from "./components/TodoHead";
import { TodoList } from "./components/TodoList";
import { TodoCreate } from "./components/TodoCreate";
import { TodoProvider } from "./TodoContext";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <div className="App">
      <TodoProvider>
        <GlobalStyle></GlobalStyle>
        <TodoTemplate>
          <TodoHead></TodoHead>
          <TodoList></TodoList>
          <TodoCreate></TodoCreate>
        </TodoTemplate>
      </TodoProvider>
    </div>
  );
}

export default App;
