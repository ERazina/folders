import React, {Component} from 'react';
import './Wrapper.scss';
import Search from '../Search/Search';
import Notes from '../Notes/Notes';
import SearchResults from '../SearchResults/SearchResults';

class Wrapper extends Component {
  render(){
    return (
      <div className="Wrapper">
          <Search />
          {this.props.searchResults.length ?
          <Notes 
          getNotes={this.props.getNotes}
          noteIsCkicked={this.props.noteIsCkicked}
          notes={this.props.notes}
          getNoteInfo={this.props.getNoteInfo}
          deleteNote={this.props.deleteNote}
          editNote={this.props.editNote}
          />
          :
          <SearchResults />
          }
      </div>
    );
  }
}

export default Wrapper;