import React from 'react'
import NavBar from './navBar/navBar'
import Footer from '../footer/footer'


const About = () => {
    return(
        <>
        <NavBar></NavBar>
         <div className="nav-bar">
             <h1>About Voyagers!</h1> 
             <p>A place to get ideas on how to plan your dream voyage! </p>
         </div>
         <Footer></Footer>
        </>
    )
}

export default About