import { Link } from "react-router-dom";
import React from 'react'
import './homePage.scss'

const MainBanner = () => {
    return (
        <section className="main-banner-area main-banner-area-one animate__animated animate__fadeInDown">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="banner-text">
                        <h2 class="animate__animated animate__bounce animate__delay-.5s">Voyager</h2>
                        <p>A place to plan your next `adventure! </p>
                        <button className="button text-link"><Link to="/about">About</Link></button>
                        </div>
                    </div>
                    <div className="col-lg-6 banner-main-img">
                        {/* Main Image */}
                            <img src="voyager-banner-logo.png" alt="Image" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainBanner;






