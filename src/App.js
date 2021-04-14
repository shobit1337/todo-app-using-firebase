import React, { useState, useEffect } from "react";
import {
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Form,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { db } from "./firebaseConfig";
import firebase from "firebase";

import Todos from "./Components/Todos.js";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    db.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  };

  function addTodo(e) {
    e.preventDefault();
    if (todoInput === "") {
      // do nothing
    } else {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
    }
    setTodoInput("");
  }

  return (
    <Container fluid>
      <h1> Todo with Firebase</h1>
      <div>
        <Form>
          <FormGroup>
            <InputGroup>
              <Input
                type="text"
                name="todo"
                id="todo"
                placeholder="Enter a todo task"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value)}
              />
              <InputGroupAddon addonType="prepend">
                <Button color="success" onClick={addTodo}>
                  Add Todo
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </FormGroup>
        </Form>
      </div>
      <div style={{ marginBottom: "2px" }}>
        <Todos todo={todos} />
      </div>
    </Container>
  );
};

export default App;
