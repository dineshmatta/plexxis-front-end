import React, { Component } from "react";
import ModalForm from '../Modals'
import api from "../../services/api";
import ReactTable from "react-table";
import { FaUserMinus } from 'react-icons/fa';

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
        console.log(`Failed to delete employee: ${e}`);
      }
    }
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getColumns() {
    if (this.props.data.length) {
      const cols =  Object.keys(this.props.data[0])
        .filter(key => key !== 'id')
        .map(key => {
          let obj = {
            Header: this.capitalizeFirstLetter(key),
            accessor: key
          }
          if (key === 'assigned') {
            obj = {...obj, Cell: props => (
              <input 
                type="checkbox" 
                id="assigned" 
                name="assigned" 
                checked={props.value} 
                disabled/>
            )}
          }
          return obj;
      });
      return [
              ...cols, 
              {   
                Header: 'Actions',
                Cell: row => (
                  <div className="actions">
                      <ModalForm buttonLabel="Edit" data={row.original} updateEmployee={this.props.updateEmployee}/>
                      <Button className="btn-delete" variant="danger" onClick={() => this.handleDelete(row.original)}><FaUserMinus /></Button>
                  </div>
                )
              }
            ];
    }
    return [];
  }

  render() {
    const data = this.props.data;
    const columns = this.getColumns();
    return (
      <React.Fragment>
        <Row>
          <Col>
            <ReactTable
              data={data}
              columns={columns}
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
