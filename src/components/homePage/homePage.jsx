import React from 'react'
import { useState } from 'react'
import VoyagerContainer from '../voyagerContainer/voyagerContainer';
import NavBar from '../navBar/navBar';
import Footer from '../../footer/footer';
import { Link } from "react-router-dom";
import './homePage.css'
import 'animate.css';

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase(); 
    setInputText(lowerCase);
  }


    return(
  
          <div className="nav-bar">
            <NavBar></NavBar> 
              <section class="animate__animated animate__bounce">
                <div class="column text">
                <h2 class="animate__animated animate__bounce">Voyager</h2>
                <p>A place to plan your next `adventure! </p>
                </div>
                <button className="button text-link"><Link to="/about">About</Link></button>
              </section>
              <div className="col-lg-6 banner-main-img">
                        {/* Main Image */}
                            <img src="/img/snacks-world-banner.png" alt="Image" />
              </div>
            {/* assign the input to inputText */}
            <VoyagerContainer input={inputText}></VoyagerContainer>
            <Footer></Footer>
          </div>
    )
}

export default HomePage