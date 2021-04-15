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
      // do nothing
    } else {
      db.collection("todos").add({
        inprogress: true,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        todo: todoInput,
      });
    }
    setTodoInput("");
  };

  const onKeyUp = (e) => {
    if (e.charCode === 13) {
      addTodo(e);
    }
  };

  return (
    <Container fluid>
      <h1> Todo with Firebase</h1>
      <Form onsubmit="return false;">
        <FormGroup>
          <InputGroup>
            <Input
              type="text"
              name="todo"
              id="todo"
              placeholder="Enter a todo task"
              value={todoInput}
              onChange={(e) => {
                e.preventDefault();
                setTodoInput(e.target.value);
              }}
              onKeyPress={onKeyUp}
            />
            <InputGroupAddon addonType="prepend">
              <Button color="success" onClick={addTodo}>
                Add Todo
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
      </Form>
      <Todos todo={todos} />
    </Container>
  );
};

export default App;
