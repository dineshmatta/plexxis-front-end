import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

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

    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Code',
      accessor: 'code'
    }, {
      Header: 'Profession',
      accessor: 'profession'
    }, {
      Header: 'Color',
      accessor: 'color'
    },{
      Header: 'City',
      accessor: 'city'
    },{
      Header: 'Branch',
      accessor: 'branch'
    },
    {
      Header: 'Assigned',
      accessor: 'assigned'
    }]
    
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col>
              <h1 style={{margin: "20px 0"}}>CRUD Database</h1>
            </Col>
          </Row>
          <ReactTable
            data={employees}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight"
          />
        </Container>
      </React.Fragment>
      
    );


  }
}

export default App;
