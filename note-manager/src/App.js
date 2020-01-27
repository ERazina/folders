
import React, {Component} from 'react';
import './App.scss';
import './reset.css';
import Manager from './components/Manager/Manager';
import { Button } from 'react-bootstrap';


class App extends Component {
  title = "Note Manager";
  constructor (props){
    super(props);
    this.state = {
      modalOpened: false,
      theme: 'dark', 
      filtered: null,
      data: null
    }
  }

  openModal = () => {
    this.setState({
      modalOpened: !this.state.modalOpened
    });
    
  }

  toggleTheme = () => {
    if(this.state.theme === 'light'){
      this.setState({
        theme: 'dark'
      })
    }
    else{
      this.setState({
        theme: 'light'
      })
    }
  }

  render(){
    
    return (
      <div className="App" className={this.state.theme === 'light' ? 'light' : 'dark'} theme={this.state.theme}>
        <Manager openModal={this.openModal}/>
        <Button onClick={this.toggleTheme} className="change">Switch theme to {this.state.theme === 'light' ? 'dak' : 'light'}</Button>
      </div>
    );
  }
}

export default App;
