import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAward,
    faStar,
    faChevronDown,
    faChevronUp,
    faHospital,
    faHandsHelping,
    faHeartbeat,
    faMapMarkerAlt,
    faPhone,
    faGlobe
} from '@fortawesome/free-solid-svg-icons';

const About = () => {
    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (type) => {
        setActiveDropdown(activeDropdown === type ? null : type);
    };

    // Sample data for connected organizations
    const healthCenters = [
        {
            id: 1,
            name: "City General Health Center",
            location: "Downtown District",
            phone: "+91 98765 43210",
            services: "Primary Care, Vaccination, Health Checkups"
        },
        {
            id: 2,
            name: "Community Wellness Center",
            location: "Suburb Area",
            phone: "+91 98765 43211",
            services: "Maternal Health, Child Care, Nutrition"
        },
        {
            id: 3,
            name: "Rural Health Outpost",
            location: "Village Center",
            phone: "+91 98765 43212",
            services: "Emergency Care, Mobile Clinics, Telemedicine"
        }
    ];

    const ngos = [
        {
            id: 1,
            name: "Health for All Foundation",
            location: "Regional Office",
            website: "www.healthforall.org",
            focus: "Community Health Education, Disease Prevention"
        },
        {
            id: 2,
            name: "Women & Child Welfare NGO",
            location: "District Center",
            website: "www.wcwelfare.org",
            focus: "Maternal Health, Child Nutrition, Family Planning"
        },
        {
            id: 3,
            name: "Rural Healthcare Initiative",
            location: "Multiple Villages",
            website: "www.ruralhealthcare.org",
            focus: "Mobile Medical Units, Health Camps, Awareness Programs"
        }
    ];

    const hospitals = [
        {
            id: 1,
            name: "Metro General Hospital",
            location: "Central District",
            phone: "+91 11 2345 6789",
            specialties: "Emergency Medicine, Surgery, ICU, Cardiology"
        },
        {
            id: 2,
            name: "Regional Medical Center",
            location: "North Zone",
            phone: "+91 11 2345 6790",
            specialties: "Pediatrics, Obstetrics, Orthopedics, Neurology"
        },
        {
            id: 3,
            name: "Specialized Care Hospital",
            location: "South Zone",
            phone: "+91 11 2345 6791",
            specialties: "Oncology, Cardiothoracic Surgery, Nephrology"
        }
    ];

    const OrganizationCard = ({ org, type }) => (
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.2s'
        }}>
            <h4 style={{
                fontWeight: '600',
                color: '#374151',
                marginBottom: '12px',
                fontSize: '16px'
            }}>
                {org.name}
            </h4>
            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
                <div style={{ marginBottom: '4px' }}>
                    📍 <span>{org.location}</span>
                </div>
                {org.phone && (
                    <div style={{ marginBottom: '4px' }}>
                        📞 <span>{org.phone}</span>
                    </div>
                )}
                {org.website && (
                    <div style={{ marginBottom: '4px' }}>
                        🌐 <span>{org.website}</span>
                    </div>
                )}
                <div style={{ marginTop: '12px' }}>
                    <p style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        fontWeight: '500',
                        marginBottom: '4px'
                    }}>
                        {type === 'hospital' ? 'Specialties:' : type === 'ngo' ? 'Focus Areas:' : 'Services:'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#374151' }}>
                        {org.specialties || org.focus || org.services}
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #dbeafe 0%, #cffafe 100%)',
            padding: '32px 16px',
            marginTop: '100px'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* Top Section - Website Info & Certificate */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '32px',
                    marginBottom: '48px'
                }}>

                    {/* Left Side - Website Information */}
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                        padding: '32px'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>

                            <p style={{ color: '#6b7280' }}>
                                Connecting Communities with Quality Healthcare
                            </p>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '12px',
                                borderLeft: '4px solid #3b82f6',
                                paddingLeft: '16px'
                            }}>
                                Project Information
                            </h3>
                            <div style={{ paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                                <p style={{ marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '500' }}>Team Name:</span> QuantumBeings
                                </p>
                                <p style={{ marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '500' }}>Development Started:</span> August 2025
                                </p>
                                <p style={{ marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '500' }}>Version:</span> 1.0.0
                                </p>
                                <p>
                                    <span style={{ fontWeight: '500' }}>Platform:</span> Web Application
                                </p>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '12px',
                                borderLeft: '4px solid #10b981',
                                paddingLeft: '16px'
                            }}>
                                Mission Statement
                            </h3>
                            <p style={{ paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                                Health Bridge is a Collaborative Health Intelligence Platform that integrates electronic health records (EHR), AI insights, secure data sharing, and telemedicine to connect patients, providers, and health systems. By leveraging technology, we bridge gaps in care to make healthcare more accessible, affordable, and efficient for every community — including marginalized populations.
                            </p>
                        </div>

                        <div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: '#374151',
                                marginBottom: '12px',
                                borderLeft: '4px solid #8b5cf6',
                                paddingLeft: '16px'
                            }}>
                                Key Features
                            </h3>
                            <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#6b7280' }}>
                                <li style={{ marginBottom: '5px' }}>
                                    • <strong>Health Resource Hub</strong> – Instant medical aid and ambulance access.
                                </li>
                                <li style={{ marginBottom: '5px' }}>
                                    • <strong>Telemedicine</strong> – Connect with top doctors online, anytime.
                                </li>
                                <li style={{ marginBottom: '5px' }}>
                                    • <strong>Program & Campaign Tracker</strong> – Track and manage health initiatives with ease.
                                </li>
                                <li style={{ marginBottom: '5px' }}>
                                    • <strong>Health & Wellness Module</strong> – Nutrition, fitness, and lifestyle support in one hub.
                                </li>
                                <li style={{ marginBottom: '5px' }}>
                                    • <strong>Feedback</strong> – Share your views to help improve our services.
                                </li>
                                <li>
                                    • <strong>Real-time Emergency Services</strong> – Immediate help when every second counts.
                                </li>

                            </ul>
                        </div>
                    </div>

                    {/* Right Side - Certificate & Rating */}
                    <div>

                        {/* Certificate Card */}
                        <div style={{
                            background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
                            borderRadius: '16px',
                            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                            padding: '32px',
                            marginBottom: '24px',
                            border: '1px solid #fbbf24'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{
                                    fontSize: '64px',
                                    color: '#f59e0b',
                                    marginBottom: '10px'
                                }}>
                                    <FontAwesomeIcon icon={faAward} className="text-6xl text-yellow-600 mb-4" />
                                </div>
                                <div style={{
                                    height: '150px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    padding: '16px',
                                    paddingTop: '50px',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)',
                                    marginBottom: '20px'
                                }}>
                                    <p style={{ fontSize: '15px', color: '#9ca3af', marginTop: '8px', marginBottom: '15px' }}>
                                        Placeholder to upload Web Application Security Certificate
                                    </p>
                                </div>
                                <div style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    padding: '10px',
                                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)'
                                }}>
                                    <p style={{ fontSize: '14px', color: '#9ca3af' }}>Certified by</p>
                                    <p style={{ fontWeight: 'bold', color: '#374151' }}>
                                        Organisation Name
                                    </p>
                                    <p style={{ fontSize: '12px', color: '#d1d5db', marginTop: '8px' }}>
                                        Certificate ID:
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rating Card */}
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                            padding: '32px'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <h2 style={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: '#374151',
                                    marginBottom: '16px'
                                }}>
                                    User Satisfaction
                                </h2>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: '16px'
                                }}>
                                    <span style={{
                                        fontSize: '48px',
                                        fontWeight: 'bold',
                                        color: '#10b981',
                                        marginRight: '8px'
                                    }}>
                                        4.8
                                    </span>
                                    <div>
                                        <div style={{
                                            color: '#fbbf24',
                                            fontSize: '20px',
                                            marginBottom: '2px'
                                        }}>
                                            ⭐⭐⭐⭐⭐
                                        </div>
                                        <span style={{ color: '#9ca3af', fontSize: '14px' }}>out of 5</span>
                                    </div>
                                </div>
                                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                                    Based on 2,847 user reviews
                                </p>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '16px'
                                }}>
                                    <div style={{
                                        backgroundColor: '#dbeafe',
                                        borderRadius: '8px',
                                        padding: '12px'
                                    }}>
                                        <p style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            color: '#2563eb'
                                        }}>
                                            15,000+
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Active Users</p>
                                    </div>
                                    <div style={{
                                        backgroundColor: '#dcfce7',
                                        borderRadius: '8px',
                                        padding: '12px'
                                    }}>
                                        <p style={{
                                            fontSize: '24px',
                                            fontWeight: 'bold',
                                            color: '#16a34a'
                                        }}>
                                            98%
                                        </p>
                                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Uptime</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Connected Organizations Section */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                    padding: '32px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h2 style={{
                            fontSize: '25px',
                            fontWeight: 'bold',
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Our Network Partners
                        </h2>
                        <p style={{ color: '#6b7280' }}>
                            Healthcare providers we're proud to work with
                        </p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>

                        {/* Health Centers */}
                        <div style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            marginBottom: '16px'
                        }}>
                            <button
                                onClick={() => toggleDropdown('healthCenters')}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    backgroundColor: '#dbeafe',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#bfdbfe'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#dbeafe'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '12px', fontSize: '20px' }}>
                                        <FontAwesomeIcon icon={faHeartbeat} className="text-blue-600 text-2xl mr-3" />
                                    </span>
                                    <span style={{ fontWeight: '600', color: '#374151' }}>
                                        Health Centers ({healthCenters.length})
                                    </span>
                                </div>
                                <span style={{ color: '#9ca3af' }}>
                                    {activeDropdown === 'healthCenters' ? '▲' : '▼'}
                                </span>
                            </button>
                            {activeDropdown === 'healthCenters' && (
                                <div style={{
                                    padding: '16px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '16px'
                                }}>
                                    {healthCenters.map((center) => (
                                        <OrganizationCard key={center.id} org={center} type="healthCenter" />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* NGOs */}
                        <div style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            marginBottom: '16px'
                        }}>
                            <button
                                onClick={() => toggleDropdown('ngos')}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    backgroundColor: '#dcfce7',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#bbf7d0'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#dcfce7'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '12px', fontSize: '20px' }}>
                                        <FontAwesomeIcon icon={faHandsHelping} className="text-green-600 text-2xl mr-3" />
                                    </span>
                                    <span style={{ fontWeight: '600', color: '#374151' }}>
                                        NGO Partners ({ngos.length})
                                    </span>
                                </div>
                                <span style={{ color: '#9ca3af' }}>
                                    {activeDropdown === 'ngos' ? '▲' : '▼'}
                                </span>
                            </button>
                            {activeDropdown === 'ngos' && (
                                <div style={{
                                    padding: '16px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '16px'
                                }}>
                                    {ngos.map((ngo) => (
                                        <OrganizationCard key={ngo.id} org={ngo} type="ngo" />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Hospitals */}
                        <div style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden'
                        }}>
                            <button
                                onClick={() => toggleDropdown('hospitals')}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    backgroundColor: '#fee2e2',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#fecaca'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#fee2e2'}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '12px', fontSize: '20px' }}>
                                        <FontAwesomeIcon icon={faHospital} className="text-red-600 text-2xl mr-3" />
                                    </span>
                                    <span style={{ fontWeight: '600', color: '#374151' }}>
                                        Hospital Network ({hospitals.length})
                                    </span>
                                </div>
                                <span style={{ color: '#9ca3af' }}>
                                    {activeDropdown === 'hospitals' ? '▲' : '▼'}
                                </span>
                            </button>
                            {activeDropdown === 'hospitals' && (
                                <div style={{
                                    padding: '16px',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                    gap: '16px'
                                }}>
                                    {hospitals.map((hospital) => (
                                        <OrganizationCard key={hospital.id} org={hospital} type="hospital" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default About;