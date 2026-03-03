import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from 'lucide-react';

const ProgramTracker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCampaignDates, setShowCampaignDates] = useState(true);

    // Sample campaign data
    const campaigns = [
        {
            id: 1,
            title: "Diabetes Awareness Campaign",
            organization: "Health Ministry",
            startDate: "2025-08-20",
            endDate: "2025-08-25",
            location: "Community Center, Delhi",
            participants: 150,
            status: "upcoming",
            description: "Free diabetes screening and awareness program for adults above 30 years."
        },
        {
            id: 2,
            title: "Maternal Health Program",
            organization: "WHO India",
            startDate: "2025-08-15",
            endDate: "2025-08-18",
            location: "District Hospital, Mumbai",
            participants: 200,
            status: "ongoing",
            description: "Comprehensive maternal and child health checkup program."
        },
        {
            id: 3,
            title: "Vaccination Drive",
            organization: "UNICEF",
            startDate: "2025-08-10",
            endDate: "2025-08-12",
            location: "Primary Health Center, Bangalore",
            participants: 300,
            status: "completed",
            description: "COVID-19 booster vaccination drive for elderly citizens."
        },
        {
            id: 4,
            title: "Mental Health Awareness",
            organization: "Indian Medical Association",
            startDate: "2025-08-25",
            endDate: "2025-08-27",
            location: "City Mall, Pune",
            participants: 120,
            status: "upcoming",
            description: "Mental health screening and counseling sessions."
        }
    ];

    // Sample user attendance history
    const attendanceHistory = [
        {
            id: 1,
            campaignName: "Heart Health Checkup",
            date: "2025-04-15",
            status: "attended",
            organization: "Cardiology Institute"
        },
        {
            id: 2,
            campaignName: "Eye Care Program",
            date: "2024-12-08",
            status: "missed",
            organization: "Vision Care Foundation"
        },
        {
            id: 3,
            campaignName: "Blood Donation Drive",
            date: "2024-09-25",
            status: "attended",
            organization: "Red Cross Society"
        },
        {
            id: 4,
            campaignName: "Nutrition Workshop",
            date: "2024-06-12",
            status: "attended",
            organization: "Health Department"
        }
    ];

    // ⬇️ MODIFIED: turn registeredCamps into state so we can update it
    const [registeredCamps, setRegisteredCamps] = useState([
        {
            id: 1,
            campaignName: "Blood Donation Drive",
            date: "2025-10-15",
            organization: "Red Cross Society"
        },
        {
            id: 2,
            campaignName: "Nutrition Workshop",
            date: "2025-12-12",
            organization: "Health Department"
        }
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'ongoing': return 'bg-blue-100 text-blue-800';
            case 'upcoming': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Simple calendar component
    const CalendarComponent = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-8"></div>);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDateObj = new Date(currentYear, currentMonth, day);

            // Check if this date falls within any campaign's date range
            const hasEvent = showCampaignDates && campaigns.some(campaign => {
                const campaignStart = new Date(campaign.startDate);
                const campaignEnd = new Date(campaign.endDate);
                // Set time to start of day for accurate comparison
                campaignStart.setHours(0, 0, 0, 0);
                campaignEnd.setHours(23, 59, 59, 999);
                currentDateObj.setHours(12, 0, 0, 0);

                return currentDateObj >= campaignStart && currentDateObj <= campaignEnd;
            });

            days.push(
                <div
                    key={day}
                    className={`h-8 flex items-center justify-center text-sm cursor-pointer rounded-lg hover:bg-blue-50 ${hasEvent ? 'bg-blue-100 text-blue-800 font-semibold border-2 border-blue-300' : ''
                        } ${day === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentYear ? 'bg-blue-500 text-white' : ''}`}
                >
                    {day}
                </div>
            );
        }

        return (
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{monthNames[currentMonth]} {currentYear}</h3>
                    <Clock className="h-5 w-5 text-gray-500" />
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {days}
                </div>

                {/* Campaign dates toggle */}
                <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={showCampaignDates}
                                onChange={(e) => setShowCampaignDates(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <label className="text-sm text-gray-600 cursor-pointer" onClick={() => setShowCampaignDates(!showCampaignDates)}>
                                Show campaign dates
                            </label>
                        </div>
                        {showCampaignDates && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="sticky top-0 shadow-sm border-b" style={{ backgroundColor: "#1d3878" }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <button
                                className="mr-4 p-2 hover:bg-blue-500 rounded-lg"
                                onClick={() => window.location.href = '/'}
                            >
                                <ArrowLeft className="h-5 w-5 text-white" />
                            </button>
                            <h1 className="text-2xl font-bold text-white">Program & Campaign Tracker</h1>
                        </div>
                        <div className="text-sm text-white">
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Side - Campaign Details */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Health Campaigns</h2>
                            <div className="space-y-4">
                                {campaigns.map((campaign) => (
                                    <div key={campaign.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                                                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 mb-4">{campaign.description}</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <Users className="h-4 w-4 mr-2" />
                                                <span className="font-medium">{campaign.organization}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-500">
                                                <Users className="h-4 w-4 mr-2" />
                                                <span>{campaign.participants} participants</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-500">
                                                <Clock className="h-4 w-4 mr-2" />
                                                <span>{formatDate(campaign.startDate)} - {formatDate(campaign.endDate)}</span>
                                            </div>

                                            <div className="flex items-center text-sm text-gray-500">
                                                <MapPin className="h-4 w-4 mr-2" />
                                                <span>{campaign.location}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-2">
                                            {/* ⬇️ MODIFIED: add onClick to register and push to registeredCamps with duplicate check */}
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                                                onClick={() => {
                                                    const already = registeredCamps.some(
                                                        (c) =>
                                                            c.campaignName === campaign.title &&
                                                            c.organization === campaign.organization
                                                    );
                                                    if (already) {
                                                        alert("⚠️ You have already registered for this campaign.");
                                                        return;
                                                    }
                                                    setRegisteredCamps((prev) => [
                                                        ...prev,
                                                        {
                                                            id: prev.length ? Math.max(...prev.map(p => p.id)) + 1 : 1,
                                                            campaignName: campaign.title,
                                                            date: campaign.startDate,
                                                            organization: campaign.organization
                                                        }
                                                    ]);
                                                    alert("🎉 Registered successfully!");
                                                }}
                                            >
                                                Register
                                            </button>
                                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                                                Learn More
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Calendar and Attendance History */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            {/* Calendar */}
                            <CalendarComponent />

                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Registered Campaigns</h3>
                                <div className="space-y-3">
                                    {registeredCamps.map((record) => (
                                        <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{record.campaignName}</h4>
                                                <p className="text-xs text-gray-500">{record.organization}</p>
                                                <p className="text-xs text-gray-500">{formatDate(record.date)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Attendance History */}
                            <div className="bg-white rounded-lg shadow-md p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Attendance History</h3>
                                <div className="space-y-3">
                                    {attendanceHistory.map((record) => (
                                        <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium text-gray-900">{record.campaignName}</h4>
                                                <p className="text-xs text-gray-500">{record.organization}</p>
                                                <p className="text-xs text-gray-500">{formatDate(record.date)}</p>
                                            </div>
                                            <div className="ml-2">
                                                {record.status === 'attended' ? (
                                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                    <XCircle className="h-5 w-5 text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Attendance Rate:</span>
                                        <span className="font-medium text-green-600">75%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramTracker;
