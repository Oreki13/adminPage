import React, { Component, Fragment } from "react";
import { Modal, Button, FormControl, ControlLabel } from "react-bootstrap";

class ModalNotif extends Component {
  state = {
    tmpData: ""
  };
  handleForm = event => {
    this.setState({ tmpData: ([event.target.name] = event.target.value) });
  };

  submit = () => {
    this.props.post2();
  };
  render() {
    console.log(this.state.tmpData);

    return (
      <Fragment>
        <Modal show={this.props.status} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title>Send Notif</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>Masukan Pesan</ControlLabel>
            <FormControl
              type="text"
              placeholder="Masukan Pesan"
              onChange={this.handleForm}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.post(this.state.tmpData)}>
              Input
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }
}

export default ModalNotif;
