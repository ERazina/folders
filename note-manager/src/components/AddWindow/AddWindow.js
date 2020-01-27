import React, {Component} from 'react';
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './AddWindow.scss';
import { Form, Col, Row, Button } from 'react-bootstrap';

class AddWindow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

    onChangeHandler = (e) => {
      this.setState({myValue: e.target.value})
    }  

    saveInput = () => {
      if(this.state.title){
        this.props.getFolderName(this.state.title);  
      }
    }

    handleChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    }

    // handleSubmit = (e) => {
    //   e.preventDefault();
    //   this.saveInput();
    // }
    
  render(){
      return (
        <div className="addForm">
          <Form onSubmit={() => this.props.postFolder(this.state.title)}>
                <Col>
                    <Form.Group as={Row} md="6" controlId="title">
                        <Form.Label>Add folder</Form.Label>
                        <Form.Control name='title' value={this.state.title} onChange={this.handleChange} placeholder="Folder title" />
                    </Form.Group>
                </Col>
                <div className="buttons">
                    <Button type="submit" onClick={() => this.props.postFolder(this.state.title , 1)}variant="success">Add folder</Button>
                    <Button onClick={this.props.close} className="cancel" variant="danger">Cancel</Button>
                </div>
            </Form>
        </div>
      )
    }
  }

export default AddWindow;