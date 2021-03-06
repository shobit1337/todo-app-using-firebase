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

  const addTodo = (e) => {
    e.preventDefault();
    if (todoInput === "") {
      return alert("Enter some value");
    } else {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
    }
    setTodoInput("");
  };

  return (
    <Container fluid>
      <h1> Todo with Firebase</h1>
      <Form onSubmit={addTodo}>
        <FormGroup>
          <InputGroup>
            <Input
              type="text"
              name="todo"
              id="todo"
              placeholder="Enter a todo task"
              value={todoInput}
              onChange={(e) => {
                setTodoInput(e.target.value);
              }}
            />
            <InputGroupAddon addonType="prepend">
              <Button color="success">Add Todo</Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
      <Todos todo={todos} />
    </Container>
  );
};

export default App;
