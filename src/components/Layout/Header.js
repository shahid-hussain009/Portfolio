/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useContext } from 'react';
import {
    Link
} from "react-router-dom";

import { ProfileContext } from '../hooks/ProfileContext';


export default function Header() {
    let { profile_image, setProfile_image } = useContext(ProfileContext);
   
    let [url_params, setDisplay_url] = useState();
    //let [profile_image, setProfile_image] = useState();
    

    useEffect(() => {

        let location = window.location.href.split('/');
        const newText = location[3].split(/#/).join('');
        

    }, [profile_image,setProfile_image]);

    return (
        <>

            <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>

            <header id="header">
                <div className="d-flex flex-column">

                    <div className="profile">
                        <img src={profile_image} alt="" className="img-fluid rounded-circle" />
                        <h1 className="text-light"><Link to={`/${url_params}/dashboard`}>Shahid Hussain</Link></h1>
                        <div className="social-links mt-3 text-center">
                            <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                            <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                            <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                            <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                            <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                        </div>
                    </div>

                    <nav className="nav-menu">
                        <ul>
                            <li className="active">
                                <Link to={`/dashboard`}><i className="bx bx-home"></i> <span>Home</span>
                                </Link>
                            </li>

                            <li className="active">
                                <Link to={`/profile`}><i className="bx bx-user"></i> <span>Profile</span>
                                </Link>
                            </li>

                            <li className="active">
                                <Link to={`/education`}><i className="bx bx-book"></i> <span>Education</span>
                                </Link>
                            </li>

                            <li className="active">
                                <Link to={`/skills`}><i className="bx bx-pen"></i> <span>Skills</span></Link>
                            </li>

                            <li className="active">
                                <Link to={`/job`}><i className="bx bx-task"></i> <span>Job Experience</span></Link>
                            </li>

                            <li className="active">
                                <Link to={`/projects`}><i className="bx bx-file"></i> <span>Projects</span></Link>
                            </li>

                            <li className="active">
                                <Link to={`/resume`}><i className="bx bx-file-blank"></i> <span>Resume</span></Link>
                            </li>

                        </ul>
                    </nav>
                    <button type="button" className="mobile-nav-toggle d-xl-none"><i className="icofont-navigation-menu"></i></button>

                </div>
            </header>

        </>
    )
}
