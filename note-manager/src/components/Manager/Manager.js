import React, {Component} from 'react';
import './Manager.scss';
import ActionPanel from '../ActionPanel/ActionPanel';
import Folders from '../Folders/Folders';
import Wrapper from '../WrapperSearchDropzone/Wrapper';
import NotesDetails from '../NotesDetails/NotesDetails';
import AddNote from '../AddNote/AddNote';
import GetNoteInfo from '../getNoteInfo/GetNoteInfo';
import EditNote from '../EditNote/EditNote';
import EditFolder from '../EditFolder/EditFolder';
import axios from "axios";
import variables from "../../variables/variables";


class Manager extends Component {

  constructor (props){
    super(props);
    this.state = {
      details: false,
      selectedFolder: null,
      opened: false,
      addNoteOpened: false,
      notes: [],
      filteredNotes: [],
      folders: [],
      name: '',
      title: '',
      noteIdClicked: null,
      noteDetailsOpened: false,
      noteId: null,
      noteTitle: null,
      noteDescription: null,
      noteTag: null,
      editNote: false,
      noteObject: {},
      editFolderOpen: false,
      folder: {},//folder was clicked
      searchResults: [] //search results
    }
  }

  componentDidMount() {
    this.loadFolders();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedFolder !== prevState.selectedFolder) {
      this.filterNotes(this.state.selectedFolder);
    }
    if(this.state.noteIdClicked !== prevState.noteIdClicked){
      this.getNoteIdClicked(this.state.noteIdClicked);
    }
  }


  // get all folders
  loadFolders = () => {
    const url = variables.url;
    this.name = axios.get(`${url}/directories`).then(res => {
      const data = res.data;

      this.setState({
        folders: [...data]
      });
      this.filterNotes(this.state.selectedFolder);

      for (let item of data) {
        this.name = item.name;
        this.id = item.id;
      }
    });
  };

  
  getFolderName = (title) => {
    this.setState({
      name: title
    });
    this.postFolder(title);
  }

// post folder
  postFolder = (title, parentId) =>{
    const url = variables.url;
    axios.post(`${url}/directories`, {
        parentId: this.state.selectedFolder,
        name: title
      })
      .then((response) => {
        console.log("SUCCESS", response);
        this.loadFolders();
      })
      .catch( (error) => {
        console.log("ERROR", error.message);
      });  
      this.setState({
        opened: false
      })
  }

  //closes addWindow component 
  close = () => {
    this.setState({
      opened: !this.state.opened
    })
  }


  // removes folder
  onFolderRemove = (id) => {
    const url = variables.url;
    axios
      .delete(`${url}/directories/${id}`)
      .then(response => {
        this.loadFolders();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

//callback used to change state when you click add folder button - it allows to render addWindow to  add folder component
  onAddFolder = () => {
    this.setState({
      opened: true
    });
  }


  //do I need it?
  noteIsCkicked = () => {
    // this.setState({
    //   details: !this.state.details
    // });
  }

  // find out folder id which was clicked
  onFolderClick = folder => {
    this.setState({
      selectedFolder: folder.id,
      folder
    });
  };

//filter notes according to the folder
  filterNotes = (id) => {
    const filtered = this.state.notes.filter(item => item.directoryId === id);
    this.setState({
      filteredNotes: [...filtered]
    }); 
  }


  onAddNote = () => {
    this.setState({
      addNoteOpened: !this.state.addNoteOpened
    });
  }



  // get or update notes
  getNotes = () => {
    const url = variables.url;
    axios.get(`${url}/notices`).then(res => {
      const data = res.data;

      this.setState({
        notes: [...data]
      });
      this.filterNotes(this.state.selectedFolder);
      for (let item of data) {
        this.name = item.name;
        this.id = item.id;
      }
    });
  }


  //post notes

  postNote = ({title, description, tag}) => {
      const url = variables.url;

        axios.post(`${url}/notices`, {
          "directoryId": this.state.selectedFolder,
          "title": title,
          "description": description,
          "tags": tag
        })
        .then((response) => {
          console.log("SUCCESS", response);
          this.setState({
            notes: [...this.state.notes, response.data]
          })
        })
        .catch( (error) => {
          console.log("ERROR", error.message);
        });  
        //update notes component
        this.getNotes();
        // close window
        this.onAddNote();

  }

  getNoteIdClicked = (id) => {
    this.setState({
      noteIdClicked: id
    });
    console.log(this.state.noteIdClicked);
  }

//delete note
  deleteNote = (id) => {
    const url = variables.url;
    axios.delete(`${url}/notices/${id}`)
    .then((response) => {
      console.log("SUCCESS", response);
      this.getNotes();
    })
    .catch( (error) => {
      console.log("ERROR", error.message);
    });  
  }

  //get note details information
  getNoteInfo = ({id, title, tags, description}) => {
    //open card details component
    this.setState({
      noteDetailsOpened: true,
      noteId: id,
      noteTitle: title,
      noteDescription: description,
      noteTag: tags
    });
  
  }

clickOutside = () => {
  if(document.getElementsByClassName !== "note"){
    this.setState({

    })
  }
}

// edit note
editNote = (note) => {
  this.setState({
    editNote: true,
    noteObject: note
  });
}

editNoteClose = () => {
  this.setState({
    editNote: false
  });
}

saveEditNote = (e, id, title, description, tags, directoryId, position) => {

  //put
  // http://localhost:3001/notices/47
  //     {
  //     "directoryId": 1,
  //     "title": "new",
  //     "description": "new",
  //     "tags": "1",
  //     "id": 47,
  //     "position": 0
  // }
  
    e.preventDefault();
    const url = variables.url;
    axios.put(`${url}/notices/${id}`, {
      "directoryId": directoryId,
      "title": title,
      "description": description,
      "tags": tags,
      "id": id,
      "position": position
    });
    this.getNotes();
    this.setState({
      editNote: false
    });
  }

  onEditFolder = () => {
    this.setState({
      editFolderOpen: true
    });
    console.log('SELECTED FOLDER',  this.state.selectedFolder)
  }

  editFolder = (e) => {
    //put
    // console.log(id);
    let id = 14;
    e.preventDefault();
    const url = variables.url;
    axios.put(`${url}/directories/${id}`, 
    {
      "parentId": 1,
      "name": "aq",
      "id": 14
    })
    .then((response) => {
      console.log("SUCCESS", response);
      this.setState({
        notes: [...this.state.notes, response.data]
      })
    })
    .catch( (error) => {
      console.log("ERROR", error.message);
    });  
    this.loadFolders();
    this.onCloseEditFolder();
  }

  onCloseEditFolder = () => {
    this.setState({
      editFolderOpen: false
    });
  }



  render(){
    return (
      <div className="Manager">
        <div className="manager-wrapper">
            <ActionPanel 
            openModal={this.props.openModal}
            details={this.props.details}
            />
            <Folders 
            openModal={this.props.openModal}
            selected={this.state.selectedFolder}
            onFolderClick={this.onFolderClick}
            onAddNote={this.onAddNote}
            addNoteOpened={this.state.addNoteOpened}
            folders={this.state.folders}
            opened={this.state.opened}
            close={this.close}
            getFolderName={this.getFolderName}
            onFolderRemove={this.onFolderRemove}
            onAddFolder={this.onAddFolder} 
            postFolder={this.postFolder}
            onEditFolder={this.onEditFolder}
            onCloseEditFolder={this.onCloseEditFolder}
            />
            <Wrapper 
            noteIsCkicked={this.state.selectedFolder}
            getNotes={this.getNotes}
            notes={this.state.filteredNotes ? this.state.filteredNotes : this.state.notes}
            getNoteInfo={this.getNoteInfo}
            deleteNote={this.deleteNote}
            editNote={this.editNote}
            searchResults={this.state.searchResults}
            />
            {
              this.state.details ?  
              <NotesDetails/> : null
            }
            {this.state.addNoteOpened ? 
            <AddNote 
            addNoteOpened={this.onAddNote}
            selectedFolder={this.state.selectedFolder}
            postNote={this.postNote}
            /> : null
            }
            {
              this.state.noteDetailsOpened ?
              <GetNoteInfo
               title={this.state.noteTitle}
               tags={this.state.noteTag}
               noteDescription={this.state.noteDescription}
               id={this.state.noteId}
               /> : null
            }
            {this.state.editNote ?
            <EditNote 
            editNoteClose={this.editNoteClose}
            note={this.state.noteObject}
            saveEditNote={this.saveEditNote}
            /> : null
            }
            {this.state.editFolderOpen ?
            <EditFolder
            onCloseEditFolder={this.onCloseEditFolder}
            editFolder={this.editFolder}
            /> : null
            }
           
        </div>
      </div>
    );
  }
}

export default Manager;