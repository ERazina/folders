import React from "react";
import "./EditFolder.scss";
import { Form, Col, Row, Button } from 'react-bootstrap';

class EditFolder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }


    handleChange = (title) => {
        this.setState({
            title
        })
    }

  render() {

    return (
        <div className="editNote">
            <h2>EDIT FOLDER:</h2>
            <Form onSubmit={(e) => this.props.editFolder(e, this.state.title)}>
                <Col>
                    <Form.Group as={Row} md="6" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={this.state.title} onChange={() => this.handleChange(this.state.title)} placeholder='title' />
                    </Form.Group>
                </Col>
                <div className="buttons">
                    <Button type="submit" onSubmit={this.props.editFolder} variant="success">Edit folder</Button>
                    <Button onClick={this.props.onCloseEditFolder} className="cancel" variant="danger">Cancel</Button>
                </div>
            </Form>
        </div>
    )

  }
}


export default EditFolder;
