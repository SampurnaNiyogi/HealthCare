import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CommunityReport = () => {
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [reportId, setReportId] = useState(null);

    const [formData, setFormData] = useState({
        reporter_name: "",
        phone_number: "",
        category: "",
        description: "",
        location: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Normally call backend here
        setReportId(Math.floor(Math.random() * 10000)); // Mock ID
        setShowForm(false); // Hide form after submit
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div
                className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b"
                style={{ backgroundColor: "#1d3878" }}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center mr-4 p-1 text-white hover:bg-blue-500 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 m-1" />
                    </button>
                    <h1 className="text-xl font-bold text-white items-center">
                        Community Reporting
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 space-y-6">
                    {/* 1. Category + Report button */}
                    <div>
                        <h2 className="text-lg font-bold mb-4">Community Reporting</h2>
                        <label className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="Mental Health">Mental Health</option>
                            <option value="Healthcare Services">Healthcare Services</option>
                            <option value="Emergency Situations">Emergency Situations</option>
                            <option value="Animal / Vector Issues">Animal / Vector Issues</option>
                            <option value="Community Requests / Awareness">
                                Community Requests / Awareness
                            </option>
                        </select>

                        <button
                            onClick={() => setShowForm(true)}
                            className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            Report
                        </button>
                    </div>

                    {/* 2. Form (stacked below category) */}
                    {showForm && (
                        <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
                            <h3 className="text-md font-semibold mb-2">Report Form</h3>
                            <input
                                type="text"
                                name="reporter_name"
                                placeholder="Your Name"
                                value={formData.reporter_name}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2"
                                required
                            />
                            <input
                                type="tel"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2"
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2"
                                required
                            />
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full border rounded-md p-2"
                                required
                            ></textarea>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 bg-gray-300 py-2 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* 3. Report Details Card (always stacked below everything) */}
                    {reportId && (
                        <div className="p-4 border rounded-md bg-gray-50">
                            <h3 className="text-md font-semibold mb-2">Report Details</h3>
                            <p>
                                <strong>Report ID:</strong> {reportId}
                            </p>
                            <p>
                                <strong>Name:</strong> {formData.reporter_name}
                            </p>
                            <p>
                                <strong>Phone:</strong> {formData.phone_number}
                            </p>
                            <p>
                                <strong>Location:</strong> {formData.location}
                            </p>
                            <p>
                                <strong>Description:</strong> {formData.description}
                            </p>
                            <p>
                                <strong>Status:</strong> Pending
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityReport;
