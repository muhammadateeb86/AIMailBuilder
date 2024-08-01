import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import "../Css/profile.css";
import stayaLogo from "../Media/stayaLogo.png";
import sample from "../Media/sample.png";
import dummy from "../Media/dummy.png";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const [logoPreview, setLogoPreview] = useState(dummy);
    const [formFeedback, setFormFeedback] = useState(false);

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

    const selectColor = (event) => {
        document.querySelectorAll('.profile_page-color').forEach((color) => {
            color.classList.remove('profile_page-selected-color');
        });
        event.target.classList.add('profile_page-selected-color');
    };

    return (
        <div className="profile_page-container">
            <Helmet>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                    integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                    crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Abel&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet" />
            </Helmet>
            <div className="profile_page-sidebar">
                <div className="profile_page-logo">
                    <img src={stayaLogo} alt="Sendif Logo" />
                </div>
                <button className="profile_page-new-design" onClick={() => navigate("/template-generation")}><i class="fa-solid fa-pen-to-square"></i>New Design</button>
                <ul className="profile_page-menu">
                    <li><a href="#" className='design-btn' style={{ backgroundColor: "white", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)" }}><i class="fa-solid fa-folder"></i>My Designs</a></li>
                    <li><a href="#"><i class="fa-solid fa-wand-magic-sparkles"></i>Templates</a></li>
                    <li><a href="#"><i class="fa-brands fa-slack"></i>Brand Kit</a></li>
                </ul>
            </div>
            <div className="profile_page-main-content">
                <h1>Brand Kit</h1>
                <form id="brand-kit-form" onSubmit={handleSubmit}>
                    <div className="profile_page-form-section">
                        <label htmlFor="logo"><h5>Logo</h5></label>
                        <img src={logoPreview} alt="Logo Preview" id="logo-preview" />
                        <input type="file" id="logo" name="logo" accept="image/*" onChange={handleLogoChange} />
                    </div>
                    <div className="profile_page-form-section">
                        <label htmlFor="brand-story">Can you please let us know how and why you came up with your brand?</label>
                        <textarea id="brand-story" name="brand-story"></textarea>
                    </div>
                    <div className="profile_page-form-section">
                        <label htmlFor="bestselling-products">What are your bestselling products and the features you would like to highlight?</label>
                        <textarea id="bestselling-products" name="bestselling-products"></textarea>
                    </div>
                    <div className="profile_page-form-section">
                        <label htmlFor="marketing-goals">What are your email marketing goals, if any, other than to drive sales?</label>
                        <textarea id="marketing-goals" name="marketing-goals"></textarea>
                    </div>
                    <div className="profile_page-colors">
                        <h2>Colors</h2>
                        <div className="profile_page-color-palette">
                            <div className="profile_page-color" style={{ backgroundColor: "#E9E2E2" }} onClick={selectColor}></div>
                            <div className="profile_page-color" style={{ backgroundColor: "#4F0505" }} onClick={selectColor}></div>
                            <div className="profile_page-color" style={{ backgroundColor: "#187918" }} onClick={selectColor}></div>
                        </div>
                    </div>
                    <button type="submit" className="profile_page-save-changes">Save Changes</button>
                    <div id="form-feedback" className={formFeedback ? '' : 'profile_page-hidden'}>Form submitted successfully!</div>
                </form>
            </div>
            <div className="profile_page-additional-content">
                <h2>Tips & Guidelines</h2>
                <div className="profile_page-tips">
                    <ul>
                        <li>Ensure your logo is clear and represents your brand identity.</li>
                        <li>Choose colors that align with your brand message.</li>
                        <li>Highlight the key features of your products.</li>
                    </ul>
                </div>
                <h2>Testimonials</h2>
                <div className="profile_page-testimonials">
                    <p>"This tool has made our branding process so much easier!" - Jane Doe</p>
                    <p>"The live preview feature is a game-changer." - John Smith</p>
                </div>
                <div className="profile_page-gallery">
                    <img src={sample} alt="Sample" />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
