import './App.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/about';
import HomePage from './components/homePage/homePage';
import Adventures from './components/adventures/adventures';

function App() {
    return ( <
        Router >
        <
        Switch > {
            /* This route is for home component 
                        with exact path "/", in component props 
                        we passes the imported component*/
        } <
        Route exact path = "/"
        component = { HomePage }
        />

        {
            /* This route is for about component 
                        with exact path "/about", in component 
                        props we passes the imported component*/
        } <
        Route path = "/about"
        component = { About }
        />

        {
            /* This route is for about component 
                        with exact path "/about", in component 
                        props we passes the imported component*/
        } <
        Route path = "/adventures"
        component = { Adventures }
        />

        {
            /* If any route mismatches the upper 
                        route endpoints then, redirect triggers 
                        and redirects app to home component with to="/" */
        } <
        Redirect to = "/" / >
        <
        /Switch> < /
        Router >
    );
}

export default App;