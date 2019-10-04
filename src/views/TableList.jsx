import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import Loading from "../components/Loading/loading";
import Card from "components/Card/Card.jsx";
import { getUser } from "../publics/redux/action/user";
import { connect } from "react-redux";
import { sendNotif } from "../publics/redux/action/notif";
import Modal from "../components/Modal/modalPanic";
import { topUp } from "../publics/redux/action/TopUp";
import Swal from "sweetalert2";
import Modal2 from "../components/Modal/modalNotif";

class TableList extends Component {
  state = {
    users: [],
    loading: true,
    modal: false,
    modal2: false,
    idUser: 0
  };
  componentDidMount = async () => {
    await this.props.dispatch(getUser());
    this.setState({
      users: this.props.users,
      loading: this.props.loading,
      reject: this.props.reject
    });
  };
  modalOpen = id => {
    this.setState({ modal: true, idUser: id });
  };
  modalClose = () => {
    this.setState({ modal: false });
  };
  modalOpen2 = id => {
    this.setState({ modal2: true, idUser: id });
  };
  modalClose2 = () => {
    this.setState({ modal2: false });
  };

  handleSubmit = data => {
    this.props.dispatch(topUp(this.state.idUser, data)).then(() => {
      Swal.fire({
        type: "success",
        title: "TopUp Berhasill",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.reload();
      });
    });
  };
  handleSubmit2 = data => {
    this.props.dispatch(sendNotif(this.state.idUser, data)).then(() => {
      Swal.fire({
        type: "success",
        title: "Pesan Terkirim",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.setState({ modal2: false });
      });
    });
  };
  render() {
    console.log(this.state.idUser);

    return (
      <div className="content">
        {this.state.loading ? (
          <div style={{ marginTop: "50%" }}>
            <Loading />
          </div>
        ) : this.state.users.users.length > 0 ? (
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="All User"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Credit</th>
                          <th>Number Phone</th>
                          <th>Add On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.users.map((user, index) => {
                          if (user.role !== "admin") {
                            return (
                              <>
                                <tr>
                                  <td key={index}>{user.name}</td>
                                  <td key={index}>{user.email}</td>
                                  <td key={index}>
                                    {" "}
                                    {user.credit.toLocaleString(
                                      navigator.language,
                                      {
                                        minimumFractionDigits: 0
                                      }
                                    )}
                                  </td>
                                  <td key={index}>{user.phone}</td>
                                  <td key={index}>
                                    <Button
                                      bsStyle="danger"
                                      bsSize="sm"
                                      onClick={() => this.modalOpen(user.id)}
                                      style={{ marginRight: "20px" }}
                                    >
                                      Top Up
                                    </Button>
                                    <Button
                                      bsStyle="danger"
                                      bsSize="sm"
                                      onClick={() => this.modalOpen2(user.id)}
                                    >
                                      Send Notif
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            );
                          }
                        })}
                      </tbody>
                    </Table>
                  }
                />
              </Col>
            </Row>
          </Grid>
        ) : (
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="All User"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Credit</th>
                          <th>Number Phone</th>
                          <th>Add On</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            Data Not Found
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  }
                />
              </Col>
            </Row>
          </Grid>
        )}
        <Modal
          status={this.state.modal}
          close={this.modalClose}
          post={this.handleSubmit}
        />
        <Modal2
          status={this.state.modal2}
          close={this.modalClose2}
          post={this.handleSubmit2}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.Users,
    loading: state.Users.isLoading,
    reject: state.Users.isRejected
  };
};
export default connect(mapStateToProps)(TableList);
