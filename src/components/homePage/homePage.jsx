import React from 'react'
import { useState } from 'react'
import VoyagerContainer from '../voyagerContainer/voyagerContainer';
import NavBar from '../navBar/navBar';
import Footer from '../../footer/footer';
import './homePage.scss'
import 'animate.css';
import MainBanner from './mainBanner';

const HomePage = () => {
  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase(); 
    setInputText(lowerCase);
  }


    return(
  
        <>
            <NavBar></NavBar> 
            <MainBanner/>
            {/* assign the input to inputText */}
            <VoyagerContainer input={inputText}></VoyagerContainer>
            <Footer></Footer>
          </>
    )
}

export default HomePage