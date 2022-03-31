import React from 'react'
import VoyagerContainer from './voyagerContainer/voyagerContainer';
import NavBar from './navBar/navBar'
import { Link } from "react-router-dom";
import './homePage.css'

const HomePage = () => {
    return(
         <div className="nav-bar">
           <NavBar></NavBar> 
            <section class="col-2 ss-style-triangles">
              <div class="column text">
              <h2>Voyager</h2>
              <p>A place to make your dreams come true! </p>
              </div>

              <button className="button"><Link to="/about" className='text-link'>About</Link></button>

            </section>

           <VoyagerContainer></VoyagerContainer>
         </div>
    )
}

export default HomePage