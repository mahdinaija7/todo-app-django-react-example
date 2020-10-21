import React from "react";
import Modal from "react-bootstrap/Modal";
import { Label, Input, Form, FormGroup, Button } from "reactstrap";

const TodoModal = (props) => (
  <Modal
    className="modal"
    animation={false}
    show={props.show}
    onHide={props.hideModal}
  >
    <Form>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            defaultValue={props.defaultTitle}
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            type="textarea"
            name="description"
            placeholder="Description"
            id="description"
            defaultValue={props.defaultDesc}
          />
        </FormGroup>
        <input type="hidden" id="isComplete" name="completed" value={false} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.hideModal}>
          Close
        </Button>
        <Button variant="primary" onClick={props.addTodo}>
          {props.modalTitle}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

TodoModal.defaultProps = {
  modalTitle: "Add New Task",
  defaultTitle: undefined,
  defaultDesc: undefined,
};

export default TodoModal;
