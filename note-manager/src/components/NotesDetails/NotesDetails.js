import React from "react";
import "./NotesDetails.scss";
import { Form, Col, Row, Button } from 'react-bootstrap';

class NotesDetails extends React.Component {

  render() {
    return (
      <div className="details">
          <h2>Details</h2>
          <Form>
                <Col>
                    <Form.Group as={Row} md="6" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control placeholder="Title" />
                    </Form.Group>

                    <Form.Group as={Row} md="6" controlId="tag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control placeholder="tag" />
                    </Form.Group>

                    <Form.Group as={Row} md="6" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="description" />
                    </Form.Group>
                </Col>
                <Button variant="success">Make changes</Button>
            </Form>
      </div>

    );
  }
}

export default NotesDetails;
