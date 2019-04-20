import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactDataTable from './Components/Tables/ReactDataTable';

class App extends React.Component {
  state = {
    employees: []
  }
  
  componentWillMount = () => {
    fetch('http://localhost:3001/api/employees')
      .then(response => response.json())
      .then(employees => this.setState({ employees }))
  }

  render1() {
    const {
      employees
    } = this.state;

    console.log(this.state);

    return (
      <div className="App">
        <h1>Plexxis Employees</h1>
        {
          employees.map(employee => (
            <div key={employee.id}>
              {
                Object.keys(employee).map(key => 
                  <span key={key}>
                    { key }:
                    { employee[key] } 
                  </span>
                )
              }
            </div>
          ))
        }
      </div>
    );
  }

  render(){
    const {
      employees
    } = this.state;

    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>Employee Records</h1>
            </Col>
          </Row>
          <ReactDataTable data={employees}></ReactDataTable>
        </Container>
      </React.Fragment>
      
    );

  }
}

export default App;
