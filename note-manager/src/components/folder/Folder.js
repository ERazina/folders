import React from "react";
import "./Folder.scss";

class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: null
    };
  }

  deleteFolder = () => {
    const id = this.props.data.id;
    this.props.onRemove(id);
  };

  render() {
    let data = this.props;

    return (
      <div
        onClick={() => {
          this.props.onFolderClick(this.props.data);
        }}
        className={`${this.props.selected === true ? "flex active" : "flex"}`}
      >
        <div className={data.parentId? 'margin' : ''}>{this.props.name}</div>
        <div
          className={`${
            this.props.selected === true ? "todo show" : "todo hide"
          }`}
        >
          <button onClick={this.props.onAddFolder}>add folder</button>
          <button onClick={this.props.onAddNote}>{this.props.addNoteOpened === false ? 'add note': 'cancel'}</button>
          <button onClick={this.props.onEditFolder}>edit</button>
          <button onClick={this.deleteFolder}>delete</button>
        </div>
      </div>
    );
  }
}

export default Folder;
