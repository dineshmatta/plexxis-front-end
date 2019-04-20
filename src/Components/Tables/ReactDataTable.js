import React, { Component } from "react";
import ReactTable from "react-table";
import { Row, Col } from "react-bootstrap";

class ReactDataTable extends Component {
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
        accessor: "assigned"
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
