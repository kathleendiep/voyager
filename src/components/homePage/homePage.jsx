import React from 'react'
import { useState } from 'react'
import VoyagerContainer from '../voyagerContainer/voyagerContainer';
import NavBar from '../navBar/navBar';


import { Link } from "react-router-dom";
import './homePage.css'
const HomePage = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase(); 
    setInputText(lowerCase);
  }


    return(
  
          <div className="nav-bar">
            <NavBar></NavBar> 
              <section class="col-2 ss-style-triangles">
                <div class="column text">
                <h2>Voyager</h2>
                <p>A place to plan your next adventure! </p>
                </div>
                <button className="button"><Link to="/about" className='text-link'>About</Link></button>
              </section>
            {/* assign the input to inputText */}
            <VoyagerContainer input={inputText}></VoyagerContainer>
          </div>

    )
}

export default HomePage