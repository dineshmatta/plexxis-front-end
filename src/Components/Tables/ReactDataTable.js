import React, { Component } from "react";
import ModalForm from '../Modals'
import api from "../../services/api";
import ReactTable from "react-table";
import { FaTrashAlt } from 'react-icons/fa';

import { Row, Col } from "react-bootstrap";

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
            obj = {...obj, width: 80, className: "center", Cell: props => (
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
                      { '|' } 
                      <FaTrashAlt className="btn-delete" onClick={() => this.handleDelete(row.original)} />
                      {/* <Button className="btn-delete" variant="danger" onClick={() => this.handleDelete(row.original)}><FaTrash /></Button> */}
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
    console.log('pp', data.length);
    return (
      <React.Fragment>
        <Row>
          <Col>
            <ReactTable
              key={data.length}
              noDataText="No Employee Records Present"
              data={data}
              columns={columns}
              defaultPageSize={data.length}
              className="-striped -highlight"
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ReactDataTable;
