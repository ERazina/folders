import React from "react";
import { Form, Col, Row, Button } from 'react-bootstrap';
import './AddNote.scss';


class AddNote extends React.Component {

    constructor(props){
        super(props);
        this.state={
            title: '',
            tag: '',
            description: '',
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

    handleSubmit = () => {
      console.log(1)
      this.props.postNote(this.state);
    }
    

  render() {

    return (
      <div className="AddNote">
          <h2>Add note</h2>
          <Form onSubmit={this.handleSubmit}>
                <Col>
                    <Form.Group as={Row} md="6" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" value={this.state.title} onChange={this.handleChange} placeholder="Title" />
                    </Form.Group>

                    <Form.Group as={Row} md="6" controlId="tag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control name="tag" value={this.state.tag} onChange={this.handleChange} placeholder="tag" />
                    </Form.Group>

                    <Form.Group as={Row} md="6" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={this.state.description} onChange={this.handleChange} placeholder="description" />
                    </Form.Group>
                </Col>
                <div className="buttons">
                    <Button type="submit" onClick={this.props.handleSubmit}variant="success">Add note</Button>
                    <Button onClick={this.props.addNoteOpened} className="cancel" variant="danger">Cancel</Button>
                </div>
            </Form>
      </div>

    );
  }
}

export default AddNote;
