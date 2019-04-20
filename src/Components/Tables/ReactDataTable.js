import React, { Component } from "react";
import ModalForm from '../Modals'
import api from "../../services/api";
import ReactTable from "react-table";
import { Row, Col, Button } from "react-bootstrap";

class ReactDataTable extends Component {

  handleDelete = async (originalRow) => {
    const confirmDelete = window.confirm('Are you sure?');
    const { id } = originalRow;
    if(confirmDelete){
      try {
        const res = await api.delete(`/api/employees/${id}`);
        console.log(res.data.id)
        this.props.deleteEmployee(res.data.id);
      } catch (e) {
        console.log(`Axios request failed: ${e}`);
      }
    }
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
                <ModalForm buttonLabel="Edit" data={row.original} updateEmployee={this.props.updateEmployee}/>
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
