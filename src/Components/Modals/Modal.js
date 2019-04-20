import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import AddEditForm from "../Forms/FormAddEdit";

class ModalForm extends Component {

  state = {
    show: false
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }))
  }

  render() {
    const label = this.props.buttonLabel;
    return (
      <React.Fragment>
        <Button variant="primary" onClick={this.toggle}>
          {label}
        </Button>
        <Modal show={this.state.show} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEditForm></AddEditForm>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggle}>
              Close
            </Button>
            <Button variant="primary" onClick={this.toggle}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ModalForm