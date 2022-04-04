import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import './navBar.css'
import {  faNavicon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NavBar = () => {
   // default - false, will show bar icon
   // true will show the whole thing
   const [showing, setShowing] = useState(false)
   const toggleShowing = () => {
     // sets it as true and will show 
       setShowing(!showing)
   }
    return(
      <>
        {
          // if showing is true - it will show the items
            showing
            ?
              <nav class="navbar navbar-default" role="navigation">
                <div id="container">
                   <h1 className="name-title"><Link to="/">Voyagers</Link></h1> 
                    <nav id="hamburgerNav">
                      <button onClick={toggleShowing} class="fa fa-bars open" aria-hidden="true"><FontAwesomeIcon icon={faNavicon} /></button>
                    </nav>
                </div> 
                <div class="container">
                    <nav id="sideNav">
                      <div>
                        {/* Endpoint to route to Home component */}
                        <Link to="/">Home</Link>
                        {/* Endpoint to route to About component */}
                        <Link to="/about">About</Link>
                        {/* Endpoint to route to Check more out! component */}
                        <Link to="/adventures">Check out some!</Link>
                      </div> 
                    </nav>
                </div>
            </nav>
            :
            <div id="container">
                   <h1 className="name-title"><Link to="/">Voyagers</Link></h1> 
                <nav id="hamburgerNav">
                  <button onClick={toggleShowing} class="fa fa-bars open" aria-hidden="true"><FontAwesomeIcon icon={faNavicon} /></button>
                </nav>
             </div> 
            }
        </>
    )
}

export default NavBar
