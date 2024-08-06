import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import "../Css/profile.css";
import stayaLogo from "../Media/stayaLogo.png";
import dummy from "../Media/dummy.png";
import { useNavigate } from 'react-router-dom';
import Template1 from '../Components/Template1.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [logoPreview, setLogoPreview] = useState(dummy);
    const [formFeedback, setFormFeedback] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [result, setResult] = useState(null);
    const promptRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleLogoChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setLogoPreview(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormFeedback(true);
        setTimeout(() => {
            setFormFeedback(false);
        }, 3000);
    };

    const handlePromptSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const prompt = promptRef.current.value;
        try {
            const response = await fetch(`${process.env.REACT_APP_FLASK_URL}/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: prompt }),
            });
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleCopyToClipboard = (id) => {
        const element = document.getElementById(id);
        navigator.clipboard.writeText(element.innerText);
        alert("Copied to clipboard");
    };

    const sendToEditor = (id) => {
        const element = document.getElementById(id);
        navigate("/editor", { state: { content: element.innerHTML } });
    };

    return (
        <div className={`profile_page-container ${menuVisible ? 'menu-visible' : ''}`}>
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                    crossOrigin="anonymous" referrerPolicy="no-referrer" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Abel&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet" />
            </Helmet>
            <div className={`profile_page-sidebar ${menuVisible ? 'visible' : ''}`}>
                <button className="profile_page-menu-toggle" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <div className="profile_page-logo">
                    <img src={stayaLogo} alt="Sendif Logo" />
                </div>
                <button className="profile_page-new-design" onClick={() => navigate("/template-generation")}>
                    <i className="fa-solid fa-pen-to-square"></i>New Design
                </button>
                <ul className="profile_page-menu">
                    <li>
                        <a href="#" className='design-btn' style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}>
                            <i className="fa-solid fa-folder"></i>My Designs
                        </a>
                    </li>
                    <li><a href="#"><i className="fa-solid fa-wand-magic-sparkles"></i>Templates</a></li>
                    <li><a href="#"><i className="fa-brands fa-slack"></i>Brand Kit</a></li>
                </ul>
            </div>
            <div className={`profile_page-main-content ${menuVisible ? 'menu-visible' : ''}`}>
                <button className="profile_page-menu-toggle-outer" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <h1>Template Generation</h1>
                <form id="brand-kit-form" onSubmit={handleSubmit}>
                    <div className="profile_page-form-section">
                        <label htmlFor="logo"><h5>Logo</h5></label>
                        <img src={logoPreview} alt="Logo Preview" id="logo-preview" />
                        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleLogoChange} />
                    </div>
                </form>
            </div>
            <div className={`profile_page-additional-content ${menuVisible ? 'menu-visible' : ''}`}>
                <h1 style={{ textAlign: "center" }}>Template Result</h1>
                <div className="profile_page-result">
                    {loading ? (
                        <div className="d-flex justify-content-center align-items-center w-100">
                            <div className="spinner-grow text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="template-container">
                            <button className="copy-button" onClick={() => handleCopyToClipboard('template1')}>
                                Copy to Clipboard
                            </button>
                            <button className="edit-button" onClick={() => sendToEditor("template1")}>
                                Edit Template
                            </button>
                            <div id="template1">
                                <Template1 result={result} />
                            </div>
                        </div>
                    ) : (
                        <p>No result to display</p>
                    )}
                </div>
            </div>
            <div className={`prompt-section ${menuVisible ? 'slide-right' : ''}`}>
                <form id="prompt-form" onSubmit={handlePromptSubmit} className="profile_page-form-with-icon">
                    <div className="profile_page-form-section">
                        <div className="textarea-container">
                            <textarea id="prompt" ref={promptRef} placeholder="Describe the email you'd like to create" />
                            <button type="submit" className="profile_page-submit-icon" disabled={loading}>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </div>
                    </div>
                    <div id="form-feedback" className={formFeedback ? '' : 'profile_page-hidden'}>Submitted successfully!</div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
