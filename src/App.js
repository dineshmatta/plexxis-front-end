import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import ReactDataTable from "./Components/Tables/ReactDataTable";
import Header from "./Components/Header";
import ModalForm from "./Components/Modals";
import api from './services/api'
import "./App.css";

class App extends React.Component {
  state = {
    employees: []
  };

  componentWillMount = async () => {
    try{
      const response = await api.get('/api/employees');
      this.setState({ employees: response.data });
    } catch(e){
      console.log('Cannot Fetch employees');
      // TODO: Add Error Boundry components 
    }
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

    if (!employees.length) {
      return (<span>Loading...</span>);
    }

    return (
      <React.Fragment>
        <Container>
          <Header />
          <Row>
            <Col>
              <ModalForm
                  buttonLabel="Add"
                  addEmployee={this.addEmployeeToState}
                />
            </Col>
          </Row>
          <ReactDataTable 
            data={employees} 
            updateEmployee={this.updateEmployee}
            deleteEmployee={this.deleteEmployee} />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
