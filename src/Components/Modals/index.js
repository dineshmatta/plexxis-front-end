import React, { Component } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import AddEditForm from "../Forms/FormAddEdit";

class ModalForm extends Component {

  state = {
    show: false
  }

  toggle = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }

  renderButton(label){
    let button = '', titile = '';
    if (label === 'Edit') {
      button =  (
          <FaEdit className="btn-edit" onClick={this.toggle}/>
      )
      titile = 'Edit Employee';
    } else {
      button = (
        <Row>
          <Col>
            <Button className="btn-add" variant="primary" onClick={this.toggle}>
              Add Employee
            </Button>
          </Col>
        </Row>
      )
      titile = 'Add Employee';
    }
    return { button, titile };
  }

  render() {
    const { button, titile } = this.renderButton(this.props.buttonLabel);
    return (
      <React.Fragment>
        {button}
        <Modal show={this.state.show} onHide={this.toggle}>
          <Modal.Header closeButton>
            <Modal.Title>{titile}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddEditForm 
              data={this.props.data}
              toggle={this.toggle}
              addEmployee={this.props.addEmployee}
              updateEmployee={this.props.updateEmployee}>
            </AddEditForm>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    )
  }
}

export default ModalForm