// src/component/Profile.jsx
import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) {
        // Redirect if user is not logged in
        navigate("/Login");
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
                {/* Profile Picture */}
                <div className="flex flex-col items-center">
                    <img
                        src={user.profileImage || "https://www.pexels.com/photo/man-holding-black-dslr-camera-370142/"}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-4 border-cyan-500 shadow-md"
                    />
                    <h1 className="text-2xl font-bold mt-4">{user.name || "User"}</h1>
                    <p className="text-gray-600">{user.role || "Member"}</p>
                </div>

                {/* Info Section */}
                <div className="mt-6 space-y-3 text-gray-700">
                    <p><span className="font-semibold">Phone:</span> {user.phone || "Not provided"}</p>
                    {user.email && <p><span className="font-semibold">Email:</span> {user.email}</p>}
                </div>

                {/* Buttons */}
                <div className="mt-8 flex justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={logoutUser}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
