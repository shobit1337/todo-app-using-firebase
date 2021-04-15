import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { RiDeleteBin2Fill, RiTaskLine, RiTaskFill } from "react-icons/ri";
import { db } from "../firebaseConfig";

const Todos = ({ todo }) => {
  function toggleInProgress(id, inprogress) {
    db.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo(id) {
    db.collection("todos").doc(id).delete();
  }

  return (
    <ListGroup className="mt-5 mb-2 items">
      {todo.map((todo) => (
        <ListGroupItem key={todo.id}>
          <span className={todo.inprogress ? "todo" : "todo done"}>
            {todo.todo}
          </span>
          <span
            className="float-left icon"
            onClick={() => toggleInProgress(todo.id, todo.inprogress)}
          >
            {todo.inprogress ? <RiTaskLine /> : <RiTaskFill />}
          </span>

          <span
            className="float-right icon"
            onClick={() => deleteTodo(todo.id)}
          >
            <RiDeleteBin2Fill />
          </span>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default Todos;
