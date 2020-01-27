import React from "react";
import  { MdInsertDriveFile, MdClose, MdModeEdit }  from "react-icons/md";
import "./Notes.scss";
import variables from "../../variables/variables";
import axios from "axios";



class Notes extends React.Component {

  componentDidMount() {
    this.props.getNotes();
  }

  loadNotes = () => {
    const url = variables.url;
    axios.get(`${url}/notices`).then(res => {
      const data = res.data;

      this.setState({
        notes: [...data]
      });
      for (let item of data) {
        this.name = item.name;
        this.id = item.id;
      }
    });
  }

  render() {
    let notes = this.props.notes;

    return (
      <div className="notes">
        <h2>NOTES</h2>
        {notes.length ? (
         <React.Fragment>
            <div>{notes.length} notes here</div>
            {notes.map((note) => {
              return(
                <div key={note.id} onClick={() => this.props.getNoteInfo(note)}className="note">
                  <span className="icon"><MdInsertDriveFile /></span>
                  <div className="title">{note.title}</div>
                  <MdModeEdit className="edit" onClick={() => this.props.editNote(note)}/>
                  <MdClose className="cross" onClick={() => this.props.deleteNote(note.id)}/>
                </div> 
                )
            })} 
            <div>{notes.title}</div>
          </React.Fragment>
          
        ) : (
          <div>No notes in this folder</div>
        )} 
      </div>

    );
  }
}

export default Notes;
