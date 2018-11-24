import React, {Component} from 'react';
import './App.css';

import HomePage from "./components/HomePage";
import Main from "./components/Main";

    class App extends Component {
        render() {
            return (
                <div className="App">
                    <HomePage/>
                </div>
            );
        }
    }

    export default App;
