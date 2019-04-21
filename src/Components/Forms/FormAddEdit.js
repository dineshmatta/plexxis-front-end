import React from "react";
import { Form, Button } from "react-bootstrap";
import api from "../../services/api";

class AddEditForm extends React.Component {
  state = {
    id: null,
    name: "",
    code: "",
    profession: "",
    color: "",
    city: "",
    branch: "",
    assigned: false
  };

  onChange = e => {
    const value =
      e.target.name === "assigned" ? e.target.checked : e.target.value;
    this.setState({ [e.target.name]: value });
  };

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        ...this.props.data
      });
    }
  }

  submitFormAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/employees', {...this.state});
      this.props.addEmployee(res.data);
      this.props.toggle();
      console.log('Returned data:', res);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
      //TODO: Add Error boundry component
    }
  }

  submitFormEdit = async (e) => {
    e.preventDefault();
    const { id } = this.state;
    try {
      const res = await api.put(`/api/employees/${id}`, {...this.state});
      this.props.updateEmployee(res.data);
      this.props.toggle();
      console.log('Returned data:', res);
    } catch (e) {
      console.log(`Axios request failed: ${e}`);
      //TODO: Add Error boundry component
    }
  }

  render() {
    const {
      name,
      code,
      profession,
      color,
      city,
      branch,
      assigned
    } = this.state;

    return (
      <Form
        onSubmit={this.props.data ? this.submitFormEdit : this.submitFormAdd}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Employee Name"
            value={name}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="code">
          <Form.Label>Code</Form.Label>
          <Form.Control
            name="code"
            type="text"
            placeholder="Code"
            value={code}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="profession">
          <Form.Label>Profession</Form.Label>
          <Form.Control
            name="profession"
            type="text"
            placeholder="Profession"
            value={profession}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <Form.Control
            name="color"
            type="text"
            placeholder="color"
            value={color}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            type="text"
            placeholder="city"
            value={city}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="branch">
          <Form.Label>Branch</Form.Label>
          <Form.Control
            name="branch"
            type="text"
            placeholder="branch"
            value={branch}
            onChange={this.onChange}
          />
        </Form.Group>
        <Form.Group controlId="assigned">
          <Form.Check
            name="assigned"
            type="checkbox"
            label="Assigned"
            checked={assigned}
            onChange={this.onChange}
          />
        </Form.Group>
        <Button className="btn-submit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}

export default AddEditForm;
