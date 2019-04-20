import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactDataTable from "./Components/Tables/ReactDataTable";
import Header from "./Components/Header/Header";
import ModalForm from "./Components/Modals/Modal"
import './App.css'

class App extends React.Component {
  state = {
    employees: []
  };

  componentWillMount = () => {
    fetch("http://localhost:3001/api/employees")
      .then(response => response.json())
      .then(employees => this.setState({ employees }));
  };

  render1() {
    const { employees } = this.state;

    console.log(this.state);

    return (
      <div className="App">
        <h1>Plexxis Employees</h1>
        {employees.map(employee => (
          <div key={employee.id}>
            {Object.keys(employee).map(key => (
              <span key={key}>
                {key}:{employee[key]}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { employees } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Header />
          <ReactDataTable data={employees} />
          <Row>
            <Col>
            <ModalForm buttonLabel="Add Employee"/>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
