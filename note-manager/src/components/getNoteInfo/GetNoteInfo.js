import React, {Component} from 'react';
import './GetNoteInfo.scss';

class GetNoteInfo extends Component {

  render(){
    return (
        <div className="getNoteInfo">
            <h2>NOTE INFO:</h2>
            <div>
                <div>Title: {this.props.title}</div>
                <div>Tags: {this.props.tags}</div>
                <div>Description: {this.props.noteDescription}</div>
            </div>
        </div>
    )
  }
}

export default GetNoteInfo;