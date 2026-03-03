import React, { useState, useEffect } from "react";

const texts = [
    "Tired of managing endless medical documents and waiting in hospital queues? With our platform, everything is stored securely online, accessible in just a few clicks. From booking doctor consultations to receiving prescriptions, we make healthcare simple, fast, and stress-free — so you can focus on getting better, not on paperwork.",
    "Struggling to find the right doctor when you need one the most? Our telemedicine feature connects you instantly to top healthcare professionals across specialties. No more traveling long distances or waiting endlessly — expert medical advice, personalized care, and treatment are now available anytime, anywhere, directly from your device.",
    "Worried about emergencies when every second counts? Our smart ambulance booking and health worker access system ensures immediate help is just a tap away. Whether you’re in the city or a remote village, we bring medical support to your doorstep, saving precious time and making healthcare truly reliable and accessible.",
    "Confused about keeping track of health programs and wellness activities? Our campaign tracker and wellness hub make it easy to stay informed, engaged, and proactive. From nutrition and fitness to lifestyle health and awareness drives, we combine fun, learning, and care — turning wellness into a journey you’ll actually enjoy."
];

function TextCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return; // Pause when hovered

        const interval = setInterval(() => {
            setActiveIndex((prev) =>
                prev === texts.length - 1 ? 0 : prev + 1
            );
        }, 2500);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div
            className="text-carousel"
            style={{ textAlign: "center", cursor: "pointer" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                display: "inline-block",
                textAlign: "justify",
                height: 175,
                fontWeight: "bold",
                color: "#07263f",
                fontSize: "1.05rem",
                whiteSpace: "pre-line"
            }}>
                {texts[activeIndex]}
            </div>
            <div className="text-carousel-dots">
                {texts.map((_, idx) => (
                    <div
                        key={idx}
                        onClick={() => setActiveIndex(idx)} // <-- Add this line
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: idx === activeIndex ? "#07263f" : "#ccc",
                            margin: "0 6px",
                            cursor: "pointer" // <-- Add pointer cursor for UX
                        }}
                    />
                ))}
            </div>

        </div>
    );
}

export default TextCarousel;