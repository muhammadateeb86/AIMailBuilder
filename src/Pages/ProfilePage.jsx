import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import stayaLogo from "../Media/stayaLogo.png";
import dummy from "../Media/dummy.png";
import { useNavigate } from 'react-router-dom';
import Template1 from '../Components/Template1.jsx';
import Template2 from '../Components/Template2.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Css/profile.css";
import juice from 'juice';

const ProfilePage = ({ setTemplateForEditor }) => {
    const navigate = useNavigate();
    const [logoPreview, setLogoPreview] = useState(dummy);
    const [formFeedback, setFormFeedback] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [result, setResult] = useState(null);
    const promptRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [isTemplate1, setIsTemplate1] = useState(true);
    const [selectedLogo, setSelectedLogo] = useState(dummy);

    const handleLogoChange = (event) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setLogoPreview(e.target.result);
            setSelectedLogo(e.target.result);
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

    const handleCopyToClipboard = (templateId) => {
        const templateElement = document.getElementById(templateId);
        const range = document.createRange();
        range.selectNode(templateElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
        alert("Template copied to clipboard!");
    };

    const extractHtml = (templateId) => {
        const element = document.getElementById(templateId);
        if (element) {
            const htmlWithInlineStyles = juice(element.outerHTML);
            return htmlWithInlineStyles;
        } else {
            console.error(`Element with ID ${templateId} not found.`);
            return null;
        }
    };

    const sendToEditor = (templateId) => {
        const extractedHtml = extractHtml(templateId);
        console.log(extractedHtml);

        setTemplateForEditor((prev) => {
            let current = prev;
            current.body.rows[0].columns[0].contents[0].values.text = extractedHtml;
            return current;
        });

        navigate("/template-editor");
    };

    const toggleTemplate = () => {
        setIsTemplate1(!isTemplate1);
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
                <h1 style={{ marginLeft: "0.5rem" }}>Template Generation</h1>
                <form id="brand-kit-form" onSubmit={handleSubmit}>
                    <div className="profile_page-form-section">
                        <label htmlFor="logo"><h5>Logo</h5></label>
                        <img src={logoPreview} alt="Logo Preview" id="logo-preview" />
                        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleLogoChange} />
                    </div>
                </form>
                <div className="social-links-section">
                    <h2>Social Links</h2>
                    <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <input type="text" id="website" placeholder="Enter your website URL" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="instagram">Instagram</label>
                        <input type="text" id="instagram" placeholder="Enter your Instagram URL" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="twitter">Twitter</label>
                        <input type="text" id="twitter" placeholder="Enter your Twitter URL" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook</label>
                        <input type="text" id="facebook" placeholder="Enter your Facebook URL" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="linkedin">LinkedIn</label>
                        <input type="text" id="linkedin" placeholder="Enter your LinkedIn URL" />
                    </div>
                </div>

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
                                <i className="fa-solid fa-clipboard"></i>
                            </button>
                            <button className="edit-button" onClick={() => sendToEditor("template1")}>
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <i
                                className={`fa-solid fa-arrow-right toggle-template ${isTemplate1 ? 'rotate-right' : 'rotate-left'}`}
                                onClick={toggleTemplate}
                                aria-label="Toggle Template"
                            ></i>
                            <div id="template1">
                                {isTemplate1 ? <Template1 result={result} logo={selectedLogo} /> : <Template2 result={result} logo={selectedLogo} />}
                            </div>
                        </div>
                    ) : (
                        <p>No result to display</p>
                    )}
                </div>
            </div>
            <div className={`prompt-section ${menuVisible ? 'slide-right' : ''}`}>
                <form id="prompt-form" onSubmit={handlePromptSubmit} className="profile_page-form-with-icon">
                    <div className="prompt-area">
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
