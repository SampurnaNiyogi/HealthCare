import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import {
    FaBars,
    FaAppleAlt,
    FaHeartbeat,
    FaBrain,
    FaSyringe,
    FaFemale,
    FaStethoscope,
    FaBook,
    FaGamepad,
} from "react-icons/fa";
import { menuItems } from "./Icons.jsx";
import Wellness from "./Wellness.jsx";
import { Tooltip } from "react-tooltip";
import { ArrowLeft } from "lucide-react";

const WellnessSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    const modules = [
        { name: 'Nutrition', icon: <FaAppleAlt /> },
        { name: 'Physical Health', icon: <FaHeartbeat /> },
        { name: 'Mental Health', icon: <FaBrain /> },
        { name: 'Lifestyle Diseases', icon: <FaSyringe /> },
        { name: 'WCD', icon: <FaFemale /> },
        { name: 'Other', icon: <FaStethoscope /> },
    ];

    const handlePurposeClick = (purpose) => {
        if (selectedModule) {
            const topic = selectedModule.toLowerCase().replace(/ /g, '-');
            navigate(`/wellness/${topic}/${purpose}`);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b" style={{ backgroundColor: "#1d3878" }}>
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate("/")} className="flex items-center mr-4 p-1 text-white  hover:bg-blue-500 rounded-lg">
                        <ArrowLeft className="w-5 h-5 m-1" />
                    </button>
                    <h1 className="text-xl font-bold text-white items-center">Health and Wellness Module</h1>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <motion.div
                    initial={{ width: 60 }}
                    animate={{ width: isOpen ? 240 : 60 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gray-800 text-white p-4 flex flex-col gap-6"
                >
                    <button className="text-xl mb-4" onClick={() => setIsOpen((prev) => !prev)}>
                        <FaBars />
                    </button>
                    <nav className={`flex flex-col gap-11 h-full overflow-y-auto ${!isOpen && 'no-scrollbar'}`}>
                        {menuItems.map((item, index) => (
                            <Wellness key={index} icon={item.icon} text={item.text} isOpen={isOpen} setIsOpen={setIsOpen} />
                        ))}
                    </nav>
                </motion.div>

                {/* Main Content Area */}
                <main className="flex-1 p-6 overflow-y-auto bg-blue-100">
                    <h2 className="text-2xl font-bold mb-15 mt-5 text-center">Health and Wellness Modules</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                        {modules.map((module) => (
                            <div
                                key={module.name}
                                className={`h-40 rounded-2xl flex flex-col justify-center items-center bg-sky-400 text-blue-950 font-semibold shadow hover:scale-105 transition cursor-pointer ${selectedModule === module.name ? 'ring-4 ring-blue-600' : ''
                                    }`}
                                onClick={() => setSelectedModule(module.name)}
                            >
                                <span className="text-3xl mb-2">{module.icon}</span>
                                {module.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center items-center gap-15 mt-15">
                        <button
                            onClick={() => handlePurposeClick('modules')}
                            disabled={!selectedModule}
                            className="bg-blue-800 text-white px-15 py-5 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-lg font-semibold shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <FaBook />
                            Health Modules
                        </button>
                        <button
                            onClick={() => handlePurposeClick('games')}
                            disabled={!selectedModule}
                            className="bg-blue-800 text-white px-15 py-5 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-lg font-semibold shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            <FaGamepad />
                            Games for Practice
                        </button>
                    </div>
                </main>

                {!isOpen && <Tooltip id="sidebar-tooltip" offset={40} />}
            </div>
        </div>
    );
};

export default WellnessSidebar;
