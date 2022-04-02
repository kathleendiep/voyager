import React from 'react'
import VoyagerContainer from './voyagerContainer/voyagerContainer';
import NavBar from './navBar/navBar'
import { Link } from "react-router-dom";
import './homePage/homePage.css'

const Adventures = () => {
    return(
         <div className="nav-bar">
           <NavBar></NavBar> 
           <section class="col-2">
              <div class="column text">
              <h1>Let's get some inspo! </h1>
              </div>
            </section>
            <VoyagerContainer></VoyagerContainer>
         </div>
    )
}

export default Adventures