import React, { Component } from "react";
import ModalForm from '../Modals/Modal'
import ReactTable from "react-table";
import { Row, Col, Button } from "react-bootstrap";

class ReactDataTable extends Component {

  handleEdit(originalRow) {
    console.log('edit', originalRow)
  }

  handleDelete(originalRow) {
    console.log('delete', originalRow)
  }

  getColumns() {
    return [
      {
        Header: "Name",
        accessor: "name" // String-based value accessors!
      },
      {
        Header: "Code",
        accessor: "code"
      },
      {
        Header: "Profession",
        accessor: "profession"
      },
      {
        Header: "Color",
        accessor: "color"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Branch",
        accessor: "branch"
      },
      {
        Header: "Assigned",
        accessor: "assigned",
        Cell: props => (
                <input 
                  type="checkbox" 
                  id="assigned" 
                  name="assigned" 
                  checked={props.value} 
                  disabled/>
              )
      },
      {
        Header: 'Actions',
        Cell: row => (
            <div className="actions">
                <ModalForm buttonLabel="Edit" data={row.original} updateEmployee={this.handleEdit}/>
                <Button className="btn-delete" variant="danger" onClick={() => this.handleDelete(row.original)}>Delete</Button>
            </div>
        )
     }
    ];
  }

  render() {
    const data = this.props.data;
    return (
      <React.Fragment>
        <Row>
          <Col>
            <ReactTable
              data={data}
              columns={this.getColumns()}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ReactDataTable;
