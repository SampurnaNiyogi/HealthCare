import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Dashboard from "./Dashboard";
import About from "./About";
import TextCarousel from './TextCarousel';
import { AuthContext } from "./AuthContext";
import { useContext, useState } from "react";

// Font Awesome Imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faUserDoctor,
    faBookMedical,
    faHandHoldingMedical,
    faLaptopMedical,
    faCaretDown,
    faBullhorn, // <-- CHANGE 1: ICON IMPORTED HERE
} from "@fortawesome/free-solid-svg-icons";
import {
    faCalendar,
    faComments,
    faComment,
    faCircleUser,
    faHouse,
    faFile,
} from "@fortawesome/free-regular-svg-icons";

const AuthConsumer = () => {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <div className="nav-login">
            {user ? (
                // The pb-3 expands the hoverable area below the avatar so there's no gap
                <div className="relative group inline-block pb-[10px]">
                    {/* Avatar */}
                    <img
                        src={user.profileImage || "src/components/images/test-profile-img-hh25.jpg"}
                        alt="Profile"
                        className="w-10 h-10 mt-[11px] rounded-full cursor-pointer border-2 border-cyan-600 hover:scale-110 transition"
                    />

                    {/* Hover Card (no mt-2; use top-full to eliminate gap) */}
                    <div className="absolute right-0 top-full hidden group-hover:block z-50">
                        <div className="w-64 bg-white text-black rounded-xl shadow-xl p-4">
                            <h2 className="text-lg font-semibold">{user.name || "User"}</h2>
                            <p className="text-gray-600">Role: {user.role || "—"}</p>
                            {user.email && <p className="text-gray-600">Email: {user.email}</p>}

                            <div className="mt-3 flex justify-between">
                                <button
                                    onClick={() => (window.location.href = "/profile")}
                                    className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
                                >
                                    View Profile
                                </button>
                                <button
                                    onClick={logoutUser}
                                    className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Link to="/login" className="login-link">
                    <button className="login-btn">
                        LOGIN <FontAwesomeIcon icon={faCircleUser} />
                    </button>
                </Link>
            )}
        </div>
    );
};

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredItem: null, // which item is currently hovered
            activeNav: "home", // Automatically highlight HOME
        };
    }

    setActiveNav = (navItem) => {
        this.setState({ activeNav: navItem });
    };

    handleProgramTrackerClick = () => {
        // Navigate to new route in same window
        window.location.href = '/program-tracker';
    };

    handleFeedbackClick = () => {
        // Navigate to new route in same window
        window.location.href = '/feedback';
    };

    renderContent = () => {
        const { activeNav } = this.state;

        if (activeNav === "home") {
            return (
                <div className="content">
                    {/* Content background */}
                    <div className="content-bg">
                        <div className="content-bg-content">
                            <TextCarousel />
                        </div>
                        <div className="content-bg-img">
                            <img src="src/components/images/hh25bg-1.jpg" alt="Background" />
                        </div>
                    </div>

                    {/* Menu section */}
                    <div className="content-menu">
                        <div className="content-menu-topic">
                            <p>Our Key Features</p>
                        </div>
                        <div className="content-menu-body-items">
                            <div
                                className="content-menu-items"
                                onMouseEnter={() => this.setState({ hoveredItem: 1 })}
                                onMouseLeave={() => this.setState({ hoveredItem: null })}
                                onClick={() => window.location.href = '/health-hub'}
                                style={{ cursor: 'pointer' }}
                            >
                                {this.state.hoveredItem !== 1 && <FontAwesomeIcon icon={faHandHoldingMedical} />}
                                <p className={this.state.hoveredItem === 1 ? "content-menu-hover" : ""}>
                                    {this.state.hoveredItem === 1
                                        ? "Instant help when every second counts. Medical aid & ambulances — just a tap away."
                                        : "Health Resource Hub"}
                                </p>
                            </div>
                            <div
                                className="content-menu-items"
                                onMouseEnter={() => this.setState({ hoveredItem: 2 })}
                                onMouseLeave={() => this.setState({ hoveredItem: null })}
                                onClick={() => window.location.href = '/telemedicine'}
                                style={{ cursor: 'pointer' }}
                            >
                                {this.state.hoveredItem !== 2 && <FontAwesomeIcon icon={faUserDoctor} />}
                                <p className={this.state.hoveredItem === 2 ? "content-menu-hover" : ""}>
                                    {this.state.hoveredItem === 2
                                        ? "India’s top doctors, now just a click away !! Skip the crowd. Get the care. Anytime. Anywhere."
                                        : "Telemedicine"}
                                </p>
                            </div>
                            <div
                                className="content-menu-items"
                                onMouseEnter={() => this.setState({ hoveredItem: 3 })}
                                onMouseLeave={() => this.setState({ hoveredItem: null })}
                                onClick={() => this.handleProgramTrackerClick()}
                                style={{ cursor: 'pointer' }}
                            >
                                {this.state.hoveredItem !== 3 && <FontAwesomeIcon icon={faCalendar} />}
                                <p className={this.state.hoveredItem === 3 ? "content-menu-hover" : ""}>
                                    {this.state.hoveredItem === 3
                                        ? "Every campaign, perfectly timed on your calendar — because great timing means greater results."
                                        : "Program And Campaign Tracker"}
                                </p>
                            </div>
                            <div
                                className="content-menu-items"
                                onMouseEnter={() => this.setState({ hoveredItem: 4 })}
                                onMouseLeave={() => this.setState({ hoveredItem: null })}
                                onClick={() => window.location.href = '/wellnesssidebar'}
                                style={{ cursor: 'pointer' }}
                            >
                                {this.state.hoveredItem !== 4 && <FontAwesomeIcon icon={faBookMedical} />}
                                <p className={this.state.hoveredItem === 4 ? "content-menu-hover" : ""}>
                                    {this.state.hoveredItem === 4
                                        ? "Wellness meets fun — learn, play, and grow healthier every day !! Nutrition, fitness, mental wellness, lifestyle health, WCD, and more..."
                                        : "Health And Wellness Module"}
                                </p>
                            </div>
                            <div
                                className="content-menu-items"
                                onMouseEnter={() => this.setState({ hoveredItem: 5 })}
                                onMouseLeave={() => this.setState({ hoveredItem: null })}
                                onClick={() => this.handleFeedbackClick()}
                            >
                                {this.state.hoveredItem !== 5 && <FontAwesomeIcon icon={faComments} />}
                                <p className={this.state.hoveredItem === 5 ? "content-menu-hover" : ""}>
                                    {this.state.hoveredItem === 5
                                        ? "We value your opinion — share your thoughts and help us shape the future of our services."
                                        : "Feedback"}
                                </p>
                            </div>

                            {/* --- CHANGE 2 & 3: NEW FEATURE BOX WITH IMPROVED LINK --- */}
                            <Link to="/report-issue" className="content-menu-items">
                                <div
                                    onMouseEnter={() => this.setState({ hoveredItem: 6 })}
                                    onMouseLeave={() => this.setState({ hoveredItem: null })}
                                >
                                    {this.state.hoveredItem !== 6 && <FontAwesomeIcon icon={faBullhorn} />}
                                    <p className={this.state.hoveredItem === 6 ? "content-menu-hover" : ""}>
                                        {this.state.hoveredItem === 6
                                            ? "Report local health or environmental issues directly to the authorities."
                                            : "Community Reporting"}
                                    </p>
                                </div>
                            </Link>
                            {/* --- END OF CHANGES --- */}

                        </div>
                    </div>
                    <div className="footer-about">
                        <p>Made with care by QuantumBeings</p>
                    </div>
                </div>
            );
        } else if (activeNav === "about") {
            return <About />;
        } else if (activeNav === "dashboard") {
            return <Dashboard />;
        }
    };

    render() {
        // const { hoveredItem } = this.state;
        const { activeNav } = this.state;

        return (
            <>
                {/* HEADER */}
                <header className="header">
                    <div className="header-info">
                        <div className="header-info-logo">
                            <img src="src/components/images/projectLogo2.png" alt="Project Logo" />
                        </div>
                        <div className="header-language">
                            <FontAwesomeIcon icon={faCaretDown} />
                            <p>English</p>
                        </div>
                    </div>
                    <div className="navbar">
                        <div className="nav-opts">
                            {/* <FontAwesomeIcon icon={faBars} /> */}
                            <div
                                className={`home ${activeNav === "home" ? "nav-active" : ""}`}
                                onClick={() => this.setActiveNav("home")}
                            >
                                <FontAwesomeIcon icon={faHouse} />
                                <p>HOME</p>
                            </div>
                            <div
                                className={`about ${activeNav === "about" ? "nav-active" : ""}`}
                                onClick={() => this.setActiveNav("about")}
                            >
                                <FontAwesomeIcon icon={faFile} />
                                <p>ABOUT US</p>
                            </div>
                            <div
                                className={`dashboard ${activeNav === "dashboard" ? "nav-active" : ""}`}
                                onClick={() => this.setActiveNav("dashboard")}
                            >
                                <FontAwesomeIcon icon={faLaptopMedical} />
                                <p> DASHBOARD</p>
                            </div>
                        </div>
                        <div className="nav-login">
                            <AuthConsumer />
                        </div>
                    </div>
                </header>

                {/* MAIN CONTENT */}
                <main className="content">{this.renderContent()}</main>

                <footer>
                    <Link to="/chatbot" className="footer-chat">
                        <div className="footer-chat-content">
                            <FontAwesomeIcon icon={faComment} />
                        </div>
                    </Link>
                </footer>
            </>
        );
    }
}

export default Home;