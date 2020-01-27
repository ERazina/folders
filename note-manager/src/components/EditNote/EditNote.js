import React from "react";
import "./EditNote.scss";
import { Form, Col, Row, Button } from 'react-bootstrap';

class EditNote extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        title: this.props.note.title,
        tags: this.props.note.tags,
        description: this.props.note.description,
        id: this.props.note.id,
        directoryId: this.props.note.directoryId,
        position: this.props.note.position
        }
    }

    handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
          });
    }


  render() {


    console.log("DIR, pos" ,this.state.directoryId, this.state.position)

    return (
        <div className="editNote">
            <h2>EDIT NOTE:</h2>
            <Form onSubmit={(e) => this.props.saveEditNote(e, this.state.id, this.state.title, this.state.description, this.state.tags, this.state.directoryId, this.props.position)}>
                <Col>
                    <Form.Group as={Row} md="6" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={this.state.title} onChange={this.handleChange} placeholder='title' />
                    </Form.Group>

                    <Form.Group as={Row} md="6" controlId="tag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control name="tags" value={this.state.tags}  onChange={this.handleChange} placeholder="tag" />
                    </Form.Group>

                    <Form.Group as={Row} md="6" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={this.state.description}  onChange={this.handleChange} placeholder="description" />
                    </Form.Group>
                </Col>
                <div className="buttons">
                    <Button type="submit" onSubmit={(e) => this.props.saveEditNote(e, this.state.id, this.state.title, this.state.description, this.state.tags, this.state.directoryId, this.props.position)}
                    variant="success">Edit note</Button>
                    <Button onClick={this.props.editNoteClose} className="cancel" variant="danger">Cancel</Button>
                </div>
            </Form>
        </div>
    )

  }
}


export default EditNote;
