import React, {Component} from 'react';
import './Search.scss';
import { Form, Col } from 'react-bootstrap';
import {MdSearch} from "react-icons/md";

class Search extends Component {


  constructor (props) {
    super(props);
    this.state = {
      searchString: ''
    }
  }

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
      });

      console.log(this.state.searchString);
  }


  render(){
    return (
      <div className="Search" onSubmit="this.props.search">
        <Form>
          <Col className="wrapper">
            <Form.Control placeholder="Search" name="searchString" value={this.state.searchString} onChange={this.handleChange} type="search"/>
            <MdSearch className="search-icon"/>
          </Col>
        </Form>
      </div>
    );
  }
}

export default Search;