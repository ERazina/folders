import React, { Component } from "react";
import axios from "axios";
import "./Folders.scss";
import variables from "../../variables/variables";
import Folder from "./../folder/Folder";
import AddWindow from '../AddWindow/AddWindow';

class Folders extends Component {

  loadNotes = () => {
    const url = variables.url;
    this.name = axios.get(`${url}/notes`).then(res => {
      const data = res.data;
      return data;
    });
  };


  render() {

    return (
      <div className="folders">
        <h2>FOLDERS</h2>
        {this.props.folders.map(item => (
          <Folder
            id={item.id}
            key={item.id}
            name={item.name}
            data={item}
            selected={item.id === this.props.selected}
            openModal={this.props.openModal}
            onFolderClick={this.props.onFolderClick}
            onRemove={this.props.onFolderRemove}
            folder={this.props.folder}
            onAddNote={this.props.onAddNote}
            addNoteOpened={this.props.addNoteOpened}
            onAddFolder={this.props.onAddFolder} //клик на добавление папки
            onEditFolder={this.props.onEditFolder}
            onCloseEditFolder={this.props.onCloseEditFolder}
          />
        ))}
        {this.props.opened ?
        <AddWindow 
        close={this.props.close}
        getFolderName={this.props.getFolderName}
        postFolder={this.props.postFolder}
        /> 
        : null}
      </div>
    );
  }
}

export default Folders;
