* {
    box-sizing: border-box; /* this includes border and margins to size */
}

body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #e9ecef;
} 
.logo {
    width: 80px; /* adjust size as needed */
    position: absolute; /* Position logo in the top left corner */
    z-index: 10; /* Ensure it is on top of other elements */
}
.banner2-email-container {
    height: fit-content;
    width: 400px; /* Adjusted to match template1 */
    margin: 0 auto; /* Adjusted to match template1 */
    background-color: white;
    border-radius: 8px;
    /* overflow: hidden; */
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    position: relative;
}

.banner2-hero {
    position: relative;
}

.banner2-hero-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
}

.banner2-hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.5); */
    border-radius: 8px 8px 0 0;
}

.banner2-hero-content {
    position: absolute;
    bottom: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #ffffff;
    width: 100%;
}

.banner2-hero-content h1 {
    font-size: 36px;
    margin-bottom: -90%;
    background-color: rgba(0, 0, 0, 0.532);
}

.banner2-hero-content p {
    font-size: 18px;
    margin-bottom: 20px;
}

.banner2-main {
    padding: 30px;
}

.banner2-main h2 {
    color: #007bff;
    font-size: 24px;
    margin-bottom: 10px;
}

.banner2-main p {
    color: #555555;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
}

.banner2-button {
    display: block;
    padding: 12px 24px;
    margin: 0 auto;
    background-color: #007bff;
    color: #ffffff;
    text-align: center;
    text-decoration: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 600;
}

.banner2-footer {
    background-color: #f8f9fa;
    color: #6c757d;
    padding: 20px;
    text-align: center;
}

.banner2-footer a {
    color: black;
    text-decoration: none;
    margin: 0 10px;
}
