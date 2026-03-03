import React, { useState, useEffect, useContext } from 'react';
import { Calendar, Pill, User, TrendingUp, Heart, Activity, Weight, Clock, Plus, Trash2, Bell, Upload, Shield, Watch, History, MessageSquare, Star, Eye, Thermometer, Droplets, Zap, Moon, Sun, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('profile');
    const [bmiData, setBmiData] = useState({ height: '', weight: '', result: null });
    const [prescriptions, setPrescriptions] = useState([]);
    const [pills, setPills] = useState([]);
    const [newPill, setNewPill] = useState({ pill_name: '', time: '', phone: user?.phone || '' });
    const [personalDetails, setPersonalDetails] = useState({});
    const profileId = user?.uid;
    // --- New States for Summary Feature ---
    const [userInput, setUserInput] = useState("");
    const [summary, setSummary] = useState("");
    const [loadingSummary, setLoadingSummary] = useState(false);
    

    useEffect(() => {
        const fetchProfile = async () => {
            if (user?.token) {
                try {
                    const response = await axios.get("http://127.0.0.1:8000/users/me", {
                        headers: { Authorization: `Bearer ${user.token}` },
                    });
                    setPersonalDetails(response.data);
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    toast.error("Could not fetch your profile.");
                }
            }
        };
        fetchProfile();
    }, [user]);

    const fetchPrescriptions = async () => {
        if (!profileId) return;
        try {
            const res = await axios.get(`http://127.0.0.1:8000/list-prescriptions/${profileId}`);
            setPrescriptions(res.data);
        } catch (err) {
            console.error("Error fetching prescriptions:", err);
        }
    };

    const fetchPills = async () => {
        if (!user?.phone) return;
        try {
            const response = await axios.get(`http://127.0.0.1:8000/reminders/list/${user.phone}`);
            setPills(response.data);
        } catch (error) {
            console.error("Error fetching pills:", error);
        }
    };

    useEffect(() => {
        fetchPrescriptions();
        fetchPills();
    }, [profileId, user]);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please choose a file first");
            return;
        }
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("profile_id", profileId);

        try {
            await axios.post("http://127.0.0.1:8000/upload-prescription", formData);
            alert("Uploaded successfully!");
            fetchPrescriptions();
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed");
        }
    };

    const handleAddPill = async () => {
        if (!newPill.pill_name || !newPill.time) {
            toast.error("Please enter pill name and time.");
            return;
        }
        try {
            await axios.post("http://127.0.0.1:8000/reminders/create", { ...newPill, phone: user.phone });
            toast.success("Pill reminder added!");
            setNewPill({ pill_name: '', time: '', phone: user.phone });
            fetchPills();
        } catch (error) {
            console.error("Error adding pill:", error);
            toast.error("Failed to add reminder.");
        }
    };

    const [campaigns] = useState([
        { id: 1, name: 'Diabetes Awareness', date: '2025-08-20', status: 'upcoming', type: 'screening' },
        { id: 2, name: 'Heart Health Check', date: '2025-08-25', status: 'upcoming', type: 'checkup' },
        { id: 3, name: 'Mental Wellness Week', date: '2025-09-01', status: 'scheduled', type: 'workshop' },
        { id: 4, name: 'Blood Donation Drive', date: '2025-07-15', status: 'completed', type: 'donation' },
        { id: 5, name: 'Eye Checkup Camp', date: '2025-06-20', status: 'completed', type: 'screening' }
    ]);

    const wearableData = {
        heartRate: { current: 72, resting: 65, max: 185 },
        steps: { today: 8247, goal: 10000, weekly: 52341 },
        calories: { burned: 324, goal: 400 },
        sleep: { hours: 7.2, quality: 'Good' },
        bodyTemp: { current: 98.6, normal: true },
        oxygenSat: { current: 98, normal: true },
        stress: { level: 'Low', score: 25 },
        hydration: { current: 6, goal: 8 },
        bloodPressure: { systolic: 120, diastolic: 80 },
        activeMinutes: { today: 45, goal: 30 }
    };

    const healthHistory = [
        { date: '2025-08-10', type: 'Prescription', doctor: 'Dr. Sharma', condition: 'Hypertension' },
        { date: '2025-07-25', type: 'Lab Report', test: 'Blood Sugar', result: 'Normal' },
        { date: '2025-07-15', type: 'Checkup', doctor: 'Dr. Patel', notes: 'Routine checkup' },
        { date: '2025-06-30', type: 'Prescription', doctor: 'Dr. Kumar', condition: 'Vitamin D deficiency' }
    ];

    const serviceHistory = [
        { date: '2025-08-15', service: 'Telemedicine Consultation', doctor: 'Dr. Mehta', status: 'completed' },
        { date: '2025-08-10', service: 'Health Analytics Report', type: 'Monthly Report', status: 'generated' },
        { date: '2025-08-05', service: 'Pill Reminder Setup', medications: '3 medications', status: 'active' },
        { date: '2025-07-28', service: 'BMI Tracking', result: 'Normal range', status: 'completed' }
    ];

    const feedbackHistory = [
        { date: '2025-08-12', rating: 5, service: 'Telemedicine', comment: 'Excellent consultation experience' },
        { date: '2025-08-05', rating: 4, service: 'Analytics', comment: 'Very helpful insights' },
        { date: '2025-07-20', rating: 5, service: 'Pill Reminder', comment: 'Never miss medications now' },
        { date: '2025-07-10', rating: 4, service: 'Campaign Registration', comment: 'Easy to register' }
    ];

    const heartRateData = [
        { time: '06:00', rate: 65 }, { time: '09:00', rate: 78 }, { time: '12:00', rate: 85 },
        { time: '15:00', rate: 82 }, { time: '18:00', rate: 90 }, { time: '21:00', rate: 72 }
    ];

    const weeklyStepsData = [
        { day: 'Mon', steps: 8500, calories: 320 },
        { day: 'Tue', steps: 6200, calories: 280 },
        { day: 'Wed', steps: 9800, calories: 380 },
        { day: 'Thu', steps: 7200, calories: 290 },
        { day: 'Fri', steps: 8900, calories: 340 },
        { day: 'Sat', steps: 12000, calories: 450 },
        { day: 'Sun', steps: 5500, calories: 220 }
    ];

    const sleepData = [
        { day: 'Mon', hours: 7.5, quality: 85 },
        { day: 'Tue', hours: 6.8, quality: 72 },
        { day: 'Wed', hours: 8.2, quality: 92 },
        { day: 'Thu', hours: 7.1, quality: 78 },
        { day: 'Fri', hours: 6.5, quality: 68 },
        { day: 'Sat', hours: 8.5, quality: 95 },
        { day: 'Sun', hours: 7.8, quality: 88 }
    ];

    const calculateBMI = () => {
        const height = parseFloat(bmiData.height) / 100;
        const weight = parseFloat(bmiData.weight);
        if (height > 0 && weight > 0) {
            const bmi = weight / (height * height);
            let category = '';
            if (bmi < 18.5) category = 'Underweight';
            else if (bmi < 25) category = 'Normal';
            else if (bmi < 30) category = 'Overweight';
            else category = 'Obese';

            setBmiData(prev => ({ ...prev, result: { bmi: bmi.toFixed(1), category } }));
        }
    };

    const togglePill = (id) => {
        setPills(pills.map(pill =>
            pill.id === id ? { ...pill, taken: !pill.taken } : pill
        ));
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-all text-base ${activeTab === id
                ? 'bg-blue-800 text-white shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
        >
            <Icon size={16} />
            <span className="font-medium">{label}</span>
        </button>
    );


    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-slate-50">
            <p className="text-lg text-slate-600">Loading dashboard...</p>
        </div>;
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen bg-slate-50">
                <div className="text-center p-10 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Access Denied</h1>
                    <p className="text-slate-600">Please <Link to="/login" className="font-medium text-blue-600 hover:underline">log in</Link> to the site to view your dashboard.</p>
                </div>
            </div>
        );
    }

    const handleViewSummary = async () => {
        if (!userInput.trim()) {
            toast.error("Please enter a question about your records.");
            return;
        }

        setLoadingSummary(true);
        setSummary(""); // Clear previous summary

        try {
            // Call your backend API endpoint
            const response = await axios.post('http://127.0.0.1:8000/summarize', {
                query: userInput
            });

            if (response.data.summary) {
                setSummary(response.data.summary);
            } else {
                toast.error(response.data.error || "An unknown error occurred.");
            }

        } catch (error) {
            console.error("Error fetching summary:", error);
            toast.error("Could not connect to the summary service. Please ensure the backend is running.");
        } finally {
            setLoadingSummary(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4 mt-30">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <p className="text-lg text-blue-950 font-bold">Monitor your health journey and stay on track</p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    <TabButton id="profile" label="Profile" icon={User} />
                    <TabButton id="health-history" label="Health History" icon={Activity} />
                    <TabButton id="wearables" label="Wearables" icon={Watch} />
                    <TabButton id="pills" label="Pill Reminder" icon={Pill} />
                    <TabButton id="bmi" label="BMI Calculator" icon={Weight} />
                    <TabButton id="campaigns" label="Campaigns" icon={Calendar} />
                    <TabButton id="history" label="App History" icon={History} />
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-5">
                    {activeTab === 'profile' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Personal Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Full Name</h3>
                                    <p className="text-base text-slate-800">{personalDetails.full_name || 'N/A'}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Age</h3>
                                    <p className="text-base text-slate-800">{personalDetails.age ? `${personalDetails.age} years` : 'N/A'}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Gender</h3>
                                    <p className="text-base text-slate-800">{personalDetails.sex || 'N/A'}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Marital Status</h3>
                                    <p className="text-base text-slate-800">{personalDetails.marital_status || 'N/A'}</p>
                                </div>
                                <div className="p-4 border border-slate-200 rounded-md bg-slate-50 col-span-1 md:col-span-2 lg:col-span-3">
                                    <h3 className="text-sm font-medium text-slate-600 mb-1">Chronic Conditions</h3>
                                    <p className="text-base text-slate-800">
                                        {Array.isArray(personalDetails.chronic_conditions) && personalDetails.chronic_conditions.length > 0
                                            ? personalDetails.chronic_conditions.join(', ')
                                            : 'No chronic conditions listed'}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm">
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                    {activeTab === 'health-history' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Health History & Prescriptions</h2>

                            {/* Upload */}
                            <div className="p-4 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50 mb-6">
                                <Upload className="mx-auto mb-2 text-slate-500" size={32} />
                                <h3 className="text-sm font-medium text-slate-700 mb-2">Upload Prescription</h3>
                                <input type="file" onChange={handleFileChange} className="mb-3" />
                                <button
                                    onClick={handleUpload}
                                    className="bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-slate-800 transition-colors"
                                >
                                    Upload File
                                </button>
                            </div>

                            {/* Prescriptions list */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-slate-700">Your Prescriptions</h3>
                                {prescriptions.length === 0 ? (
                                    <p className="text-sm text-slate-500">No prescriptions uploaded yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {prescriptions.map((p, idx) => (
                                            <li key={idx} className="p-3 border border-slate-200 rounded-md bg-slate-50 flex justify-between">
                                                <span>{p.file_name} ({new Date(p.uploaded_at).toLocaleDateString()})</span>
                                                <a
                                                    href={`http://127.0.0.1:8000/get-prescription/${p.file_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    View
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-3 text-slate-700">Your Summary Report</h3>
                                {/* User input for LLM prompt */}
                                <div className="flex items-center">
                                <input
                        type="text"
                        placeholder="Ask a question about your medical records"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        className="border border-slate-300 rounded p-2 flex-grow text-sm"
                    />

                                {/* View Summary Button */}
                                <button
                        onClick={handleViewSummary}
                        className="bg-blue-900 text-white px-4 py-2 ml-4 rounded-md text-sm hover:bg-slate-800 transition-colors disabled:bg-slate-400"
                        disabled={loadingSummary}
                    >
                        {loadingSummary ? "Generating..." : "View Summary"}
                    </button>
                    </div>

                                {/* Clinical Summary Section - Updated to be dynamic */}
                {(loadingSummary || summary) && (
                    <div className="mt-6 p-4 border border-slate-200 rounded-md bg-slate-50">
                        <h4 className="text-md font-medium mb-2 text-slate-700">Clinical Summary</h4>
                        {loadingSummary ? (
                            <p className="text-sm text-slate-600 animate-pulse">Loading your summary...</p>
                        ) : (
                            // Using whitespace-pre-wrap to respect newlines from the LLM response
                            <p className="text-sm text-slate-600 whitespace-pre-wrap">{summary}</p>
                        )}
                    </div>
                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'wearables' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Wearable Device Data</h2>

                            {/* Key Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Heart className="text-red-600" size={20} />
                                        <span className="text-xs text-red-600 font-medium">BPM</span>
                                    </div>
                                    <p className="text-lg font-semibold text-red-700">{wearableData.heartRate.current}</p>
                                    <p className="text-xs text-red-600">Heart Rate</p>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity className="text-blue-600" size={20} />
                                        <span className="text-xs text-blue-600 font-medium">Steps</span>
                                    </div>
                                    <p className="text-lg font-semibold text-blue-700">{wearableData.steps.today.toLocaleString()}</p>
                                    <p className="text-xs text-blue-600">Today</p>
                                </div>

                                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Zap className="text-orange-600" size={20} />
                                        <span className="text-xs text-orange-600 font-medium">Cal</span>
                                    </div>
                                    <p className="text-lg font-semibold text-orange-700">{wearableData.calories.burned}</p>
                                    <p className="text-xs text-orange-600">Calories</p>
                                </div>

                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Moon className="text-purple-600" size={20} />
                                        <span className="text-xs text-purple-600 font-medium">Hrs</span>
                                    </div>
                                    <p className="text-lg font-semibold text-purple-700">{wearableData.sleep.hours}</p>
                                    <p className="text-xs text-purple-600">Sleep</p>
                                </div>

                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <Thermometer className="text-green-600" size={20} />
                                        <span className="text-xs text-green-600 font-medium">°F</span>
                                    </div>
                                    <p className="text-lg font-semibold text-green-700">{wearableData.bodyTemp.current}</p>
                                    <p className="text-xs text-green-600">Body Temp</p>
                                </div>
                            </div>

                            {/* Additional Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Droplets className="text-slate-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Blood Pressure</span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-800">
                                        {wearableData.bloodPressure.systolic}/{wearableData.bloodPressure.diastolic} mmHg
                                    </p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Target className="text-slate-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Oxygen Saturation</span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-800">{wearableData.oxygenSat.current}%</p>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Sun className="text-slate-600" size={18} />
                                        <span className="text-sm font-medium text-slate-700">Active Minutes</span>
                                    </div>
                                    <p className="text-base font-semibold text-slate-800">{wearableData.activeMinutes.today} min</p>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold mb-3 text-slate-700">Weekly Steps</h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <BarChart data={weeklyStepsData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Bar dataKey="steps" fill="#1d3878" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="text-sm font-semibold mb-3 text-slate-700">Sleep Hours</h3>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <LineChart data={sleepData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                                            <YAxis tick={{ fontSize: 12 }} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="hours" stroke="#4526ab" strokeWidth={2} dot={{ fill: '#475569' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pills' && (
                        <div>
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-xl font-semibold text-slate-800">Pill Reminder</h2>
                            </div>

                            {/* Add Pill Form */}
                            <div className="p-4 border rounded-lg bg-slate-50 mb-6">
                                <h3 className="text-lg font-medium text-slate-700 mb-3">Add New Reminder</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        type="text"
                                        placeholder="Pill Name (e.g., Vitamin C)"
                                        value={newPill.pill_name}
                                        onChange={(e) => setNewPill({ ...newPill, pill_name: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-md"
                                    />
                                    <input
                                        type="time"
                                        value={newPill.time}
                                        onChange={(e) => setNewPill({ ...newPill, time: e.target.value })}
                                        className="w-full p-2 border border-slate-300 rounded-md"
                                    />
                                    <button
                                        onClick={handleAddPill}
                                        className="bg-blue-900 text-white px-3 py-2 rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2 text-sm"
                                    >
                                        <Plus size={16} />
                                        <span>Add Pill</span>
                                    </button>
                                </div>
                            </div>

                            {/* Pill List */}
                            <div className="space-y-3">
                                {pills.map((pill, index) => (
                                    <div key={index} className="p-4 border rounded-lg bg-white border-slate-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-blue-100 p-2 rounded-full">
                                                    <Pill size={16} className="text-blue-700" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-medium text-slate-800">{pill.pill_name}</h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-1 text-slate-600">
                                                    <Clock size={14} />
                                                    <span className="text-xs">{pill.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {pills.length === 0 && (
                                    <p className="text-sm text-slate-500 text-center py-4">No pill reminders have been set up yet.</p>
                                )}
                            </div>
                        </div>
                    )}


                    {activeTab === 'bmi' && (
                        <div className="max-w-md mx-auto">
                            <h2 className="text-xl font-semibold mb-5 text-center text-slate-800">BMI Calculator</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Height (cm)</label>
                                    <input
                                        type="number"
                                        value={bmiData.height}
                                        onChange={(e) => setBmiData(prev => ({ ...prev, height: e.target.value }))}
                                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                        placeholder="Enter height in cm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Weight (kg)</label>
                                    <input
                                        type="number"
                                        value={bmiData.weight}
                                        onChange={(e) => setBmiData(prev => ({ ...prev, weight: e.target.value }))}
                                        className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-slate-500 focus:border-transparent text-sm"
                                        placeholder="Enter weight in kg"
                                    />
                                </div>
                                <button
                                    onClick={calculateBMI}
                                    className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium"
                                >
                                    Calculate BMI
                                </button>
                                {bmiData.result && (
                                    <div className="mt-6 p-4 bg-slate-50 rounded-md text-center border border-slate-200">
                                        <p className="text-xl font-semibold text-slate-700">{bmiData.result.bmi}</p>
                                        <p className="text-sm text-slate-600">{bmiData.result.category}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'campaigns' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">Health Campaigns</h2>

                            {/* Upcoming Campaigns */}
                            <div className="mb-8">
                                <h3 className="text-lg font-medium mb-4 text-slate-700">Upcoming Campaigns</h3>
                                <div className="grid gap-4">
                                    {campaigns.filter(campaign => campaign.status === 'upcoming').map(campaign => (
                                        <div key={campaign.id} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium text-slate-800">{campaign.name}</h4>
                                                    <p className="text-sm text-slate-600">
                                                        {new Date(campaign.date).toLocaleDateString()} • {campaign.type}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="bg-slate-700 text-white px-3 py-1 rounded text-xs hover:bg-slate-800 transition-colors">
                                                        registered
                                                    </button>
                                                    <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">
                                                        {campaign.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Campaign History */}
                            <div>
                                <h3 className="text-lg font-medium mb-4 text-slate-700">Campaign History</h3>
                                <div className="grid gap-4">
                                    {campaigns.filter(campaign => campaign.status === 'completed').map(campaign => (
                                        <div key={campaign.id} className="p-4 border border-slate-200 rounded-lg">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-base font-medium text-slate-800">{campaign.name}</h4>
                                                    <p className="text-sm text-slate-600">
                                                        {new Date(campaign.date).toLocaleDateString()} • {campaign.type}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">
                                                        {campaign.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'history' && (
                        <div>
                            <h2 className="text-xl font-semibold mb-5 text-slate-800">App History</h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Feedback History */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <MessageSquare className="text-slate-600" size={20} />
                                        <h3 className="text-lg font-medium text-slate-700">Feedback History</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {feedbackHistory.map((feedback, index) => (
                                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">{feedback.service}</p>
                                                        <div className="flex items-center space-x-1 mt-1">
                                                            {Array.from({ length: 5 }, (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={12}
                                                                    className={`${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-slate-500">{feedback.date}</span>
                                                </div>
                                                <p className="text-xs text-slate-600">{feedback.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Service History */}
                                <div>
                                    <div className="flex items-center space-x-2 mb-4">
                                        <History className="text-slate-600" size={20} />
                                        <h3 className="text-lg font-medium text-slate-700">Service Usage History</h3>
                                    </div>
                                    <div className="space-y-3">
                                        {serviceHistory.map((service, index) => (
                                            <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">{service.service}</p>
                                                        <p className="text-xs text-slate-600">
                                                            {service.doctor && `${service.doctor} • `}
                                                            {service.type || service.medications || service.result}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-slate-500">{service.date}</span>
                                                        <div className="mt-1">
                                                            <span className={`px-2 py-1 rounded text-xs ${service.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                                service.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                                    'bg-slate-100 text-slate-800'
                                                                }`}>
                                                                {service.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;