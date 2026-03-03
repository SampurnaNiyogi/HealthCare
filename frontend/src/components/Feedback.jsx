import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar,
    faHandHoldingMedical,
    faUserDoctor,
    faCalendar,
    faBookMedical,
    faPaperPlane,
    faHistory,
    faCheck,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

const Feedback = () => {
    const [selectedService, setSelectedService] = useState('');
    const [rating, setRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedbackHistory, setFeedbackHistory] = useState([
        {
            id: 1,
            service: 'Health Resource Hub',
            rating: 4,
            feedback: 'Very helpful resources, but could use more emergency contact information.',
            date: '2025-06-15',
            status: 'reviewed'
        },
        {
            id: 2,
            service: 'Telemedicine',
            rating: 5,
            feedback: 'Excellent service! The doctor was very professional and the video quality was great.',
            date: '2025-04-04',
            status: 'reviewed'
        },
        {
            id: 3,
            service: 'Health Modules',
            rating: 5,
            feedback: 'Really helpful and easy to understand.',
            date: '2025-03-06',
            status: 'reviewed'
        },
        {
            id: 4,
            service: 'Program And Campaign Tracker',
            rating: 4,
            feedback: 'Good concept but the interface could be more intuitive.',
            date: '2025-01-03',
            status: 'pending'
        }
    ]);

    const services = [
        { id: 'health-hub', name: 'Health Resource Hub', icon: faHandHoldingMedical },
        { id: 'telemedicine', name: 'Telemedicine', icon: faUserDoctor },
        { id: 'program-tracker', name: 'Program And Campaign Tracker', icon: faCalendar },
        { id: 'wellness-module', name: 'Health And Wellness Module', icon: faBookMedical }
    ];

    const handleStarClick = (starRating) => {
        setRating(starRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedService || !rating || !feedbackText.trim()) {
            alert('Please fill in all fields');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            const newFeedback = {
                id: feedbackHistory.length + 1,
                service: services.find(s => s.id === selectedService)?.name,
                rating,
                feedback: feedbackText,
                date: new Date().toISOString().split('T')[0],
                status: 'pending'
            };

            setFeedbackHistory([newFeedback, ...feedbackHistory]);

            // Reset form
            setSelectedService('');
            setRating(0);
            setFeedbackText('');
            setIsSubmitting(false);

            alert('Feedback submitted successfully!');
        }, 1000);
    };

    const renderStars = (currentRating, interactive = true) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`text-lg transition-colors cursor-pointer ${star <= currentRating ? 'text-yellow-400' : 'text-gray-300'
                            } ${interactive ? 'hover:text-yellow-400' : ''}`}
                        onClick={interactive ? () => handleStarClick(star) : undefined}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Similar to Program Tracker */}
            <header className="sticky top-0 shadow-sm border-b" style={{ backgroundColor: "#1d3878" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button
                                className="mr-4 p-2 hover:bg-blue-500 rounded-lg"
                                onClick={() => window.location.href = '/'}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 text-white" />
                            </button>
                            <h1 className="text-2xl font-bold text-white">Feedback</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Feedback Form - Left Side */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center mb-6">
                            <FontAwesomeIcon icon={faPaperPlane} className="text-blue-600 text-2xl mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Submit Feedback</h2>
                        </div>

                        <div className="space-y-6">
                            {/* Service Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Which service would you like to provide feedback for? *
                                </label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {services.map((service) => (
                                        <div
                                            key={service.id}
                                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedService === service.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            onClick={() => setSelectedService(service.id)}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FontAwesomeIcon
                                                    icon={service.icon}
                                                    className={`text-lg ${selectedService === service.id ? 'text-blue-600' : 'text-gray-500'
                                                        }`}
                                                />
                                                <span className={`text-sm font-medium ${selectedService === service.id ? 'text-blue-800' : 'text-gray-700'
                                                    }`}>
                                                    {service.name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    How would you rate your experience? *
                                </label>
                                <div className="flex items-center space-x-4">
                                    {renderStars(rating)}
                                    <span className="text-sm text-gray-600">
                                        {rating > 0 && `${rating}/5 stars`}
                                    </span>
                                </div>
                            </div>

                            {/* Feedback Text */}
                            <div>
                                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-3">
                                    Tell us about your experience *
                                </label>
                                <textarea
                                    id="feedback"
                                    value={feedbackText}
                                    onChange={(e) => setFeedbackText(e.target.value)}
                                    placeholder="Please share your thoughts, suggestions, or any issues you encountered..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows="5"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${isSubmitting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300'
                                    } text-white`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Submitting...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center">
                                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                                        Submit Feedback
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Feedback History - Right Side */}
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-center mb-6">
                            <FontAwesomeIcon icon={faHistory} className="text-green-600 text-2xl mr-3" />
                            <h2 className="text-2xl font-semibold text-gray-800">Your Feedback History</h2>
                        </div>

                        <div className="space-y-4 max-h-115 overflow-y-auto">
                            {feedbackHistory.length === 0 ? (
                                <div className="text-center py-8 text-gray-500">
                                    <FontAwesomeIcon icon={faHistory} className="text-4xl mb-4" />
                                    <p>No feedback history yet.</p>
                                    <p className="text-sm">Submit your first feedback using the form on the left!</p>
                                </div>
                            ) : (
                                feedbackHistory.map((feedback) => (
                                    <div
                                        key={feedback.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-800">{feedback.service}</span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${feedback.status === 'reviewed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                >
                                                    {feedback.status === 'reviewed' ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faCheck} className="mr-1" />
                                                            Reviewed
                                                        </>
                                                    ) : (
                                                        'Pending Review'
                                                    )}
                                                </span>
                                            </div>
                                            <span className="text-sm text-gray-500">{feedback.date}</span>
                                        </div>

                                        <div className="mb-2">
                                            {renderStars(feedback.rating, false)}
                                        </div>

                                        <p className="text-gray-700 text-sm leading-relaxed">
                                            {feedback.feedback}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        {feedbackHistory.length > 3 && (
                            <div className="mt-4 text-center">
                                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View All Feedback ({feedbackHistory.length})
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;