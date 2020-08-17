import React from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        url: String(),
        db: String(),
        collections: Array()
        }
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    fetchCollection = e => {
        e.preventDefault();

        axios.post("http://localhost:29928/export_db", {
            url: this.state.url,
            db: this.state.db,
            unique: true,
            separate: true
        }).then(res => {
            //this.setState({collections: res.data})
            //console.log(res.data);
        })

    }
  
  render() {
    let list = this.state.collections.map(collection => (
      <li>{collection.name}</li>
    ))
    return (
        <React.Fragment>
            <Navbar />
            <div className="container">
            
            </div>
        </React.Fragment>
        
      
    );
  }
  
}

export default App;
