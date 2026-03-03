import React, { useState } from "react";
import { ArrowLeft, PhoneCall, Upload, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Telemedicine() {
    const navigate = useNavigate();
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        symptoms: "",
        date: "",
        time: "",
    });
    const [reports, setReports] = useState(null);

    const doctors = [
        { name: "Dr. A. Sharma", speciality: "General Physician", online: true },
        { name: "Dr. B. Verma", speciality: "Pediatrician", online: false },
        { name: "Dr. C. Patel", speciality: "Dermatologist", online: true },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            name: "",
            age: "",
            symptoms: "",
            date: "",
            time: "",
        });
        setSelectedDoctor("");
        setReports(null);
    };

    const handleFileUpload = (e) => {
        setReports(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Appointment booked successfully with " + selectedDoctor);
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header - DO NOT TOUCH */}
            <div
                className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b"
                style={{ backgroundColor: "#1d3878" }}
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center mr-4 p-1 text-white  hover:bg-blue-500 rounded-lg"
                    >
                        <ArrowLeft className="w-5 h-5 m-1" />
                    </button>
                    <h1 className="text-xl font-bold text-white items-center">
                        Telemedicine
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto mt-10 p-10 bg-blue-100 rounded-xl shadow space-y-8">
                {/* eSanjeevani Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="text-xl font-semibold mb-1">eSanjeevani</div>
                        <div className="text-gray-600 text-base">
                            India's National Telemedicine Service
                        </div>
                    </div>
                    <a
                        href="https://esanjeevani.mohfw.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-800 transition"
                    >
                        Visit eSanjeevani
                    </a>
                </div>
            </div>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-8">
                {/* Appointment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-xl font-semibold">Book an Appointment</div>

                    {/* Doctor Dropdown */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Select Doctor
                        </label>
                        <select
                            value={selectedDoctor}
                            onChange={(e) => setSelectedDoctor(e.target.value)}
                            className="w-full p-2 border rounded-lg"
                            required
                        >
                            <option value="">-- Choose Doctor --</option>
                            {doctors.map((doc, index) => (
                                <option key={index} value={doc.name}>
                                    {doc.name} ({doc.speciality}){" "}
                                    {doc.online ? "🟢 Online" : "🔴 Offline"}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Patient Details */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        placeholder="Your Age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                    <textarea
                        name="symptoms"
                        placeholder="Describe your symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        rows="3"
                        required
                    ></textarea>

                    {/* Date & Time */}
                    <div className="flex gap-4">
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-lg"
                            required
                        />
                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className="w-1/2 p-2 border rounded-lg"
                            required
                        />
                    </div>

                    {/* Upload Reports */}
                    <div className="flex items-center gap-2">
                        <p className="">Upload Reports</p>
                        <Upload className="w-8 h-8 text-gray-600" />
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="w-full"
                            accept=".pdf,.jpg,.png"
                        />
                    </div>
                    {reports && (
                        <div className="text-sm text-gray-600">
                            Uploaded: {reports.name}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
                        >
                            Confirm Appointment
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Video Call Placeholder */}
                <div className="p-4 border rounded-lg shadow-inner bg-gray-50">
                    <div className="flex items-center justify-between">
                        <span className="font-medium">Start Video Consultation</span>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
                            <Video className="w-5 h-5" />
                            Join Call
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        (Integrated via Zoom API)
                    </p>
                </div>


            </div>
        </div>
    );
}
