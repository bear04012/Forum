import React, { Component } from 'react';

import Forum from './containers/Forum';
import Contact from './containers/Contact';
import Home from './containers/Home';

import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu:"HOME"
        }
    
    }
    render() {
        return (
            <div className="App">
                <div className="btns">
                    <button onClick={() =>{
                        this.setState({menu:"HOME"});
                    }}>HOME</button>
                    <button onClick={() => {
                        this.setState({menu:"Forum"});
                    }}>Forum Page</button>
                    <button onClick={() => {
                        this.setState({menu:"Contact"});
                    }}>Contact us</button>
                </div>
                
                { this.state.menu === "HOME" && <Home /> }
                { this.state.menu === "Forum" && <Forum/>}
                { this.state.menu === "Contact" && <Contact/> }
            </div>
        );
    }
}

export default App;


// http://cosketch.com/Rooms/tvybujf