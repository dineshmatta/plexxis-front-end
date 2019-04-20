import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ReactDataTable from "./Components/Tables/ReactDataTable";
import Header from "./Components/Header";
import ModalForm from "./Components/Modals";
import "./App.css";

class App extends React.Component {
  state = {
    employees: []
  };

  componentWillMount = () => {
    fetch("http://localhost:3001/api/employees")
      .then(response => response.json())
      .then(employees => this.setState({ employees }));
  };

  addEmployeeToState = employee => {
    this.setState(prevState => ({
      employees: [...prevState.employees, employee]
    }));
  };

  updateEmployee = (item) => {
    this.setState(prevState => ({
      employees: prevState.employees.map(
        employee => (employee.id !== item.id) ? employee : {...employee, ...item}
      )
    }))
  }
  
  deleteEmployee = (id) => {
    const updatedEmployees = this.state.employees.filter(item => item.id !== id)
    this.setState({ employees: updatedEmployees })
  }

  render() {
    const { employees } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Header />
          <ReactDataTable 
            data={employees} 
            updateEmployee={this.updateEmployee}
            deleteEmployee={this.deleteEmployee} />
          <Row>
            <Col>
              <ModalForm
                buttonLabel="Add"
                addEmployee={this.addEmployeeToState}
              />
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
