import React from 'react';
import './App.css';
import axios from 'axios';

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

        axios.post("http://localhost:5001/export_db", {
            url: this.state.url,
            db: this.state.db,
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
        <div className="container">
            <br/>
            <div className="card">
                <div className="card-body">
                    <h1>Hey</h1>
                    <form onSubmit={this.fetchCollection}>
                        <div className="form-group">
                            <input className="form-control" name="url" placeholder="url" onChange={this.onChange} value={this.state.url}></input>
                            <input className="form-control" name="db" placeholder="db" onChange={this.onChange} value={this.state.db}></input>
                            <button type="submit" className="btn btn-success btn-block">Submit</button>
                        </div>
                    </form>
                    {list}
                </div>
            </div>
        </div>
      
    );
  }
  
}

export default App;
