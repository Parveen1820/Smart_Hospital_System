import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Stethoscope, Star } from 'lucide-react';

const DoctorsPage = () => {
    const [doctorsList, setDoctorsList] = useState([]);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [visibleInfo, setVisibleInfo] = useState('');

    // NEW STATES
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

    const fetchDoctors = async () => {
        try {
            const res = await fetch('/doctors');

            if (res.ok) {
                const data = await res.json();

                if (Array.isArray(data)) {
                    setDoctorsList(data);
                }
            }
        } catch (err) {
            console.error("Error fetching doctors:", err);
        }
    };

    useEffect(() => {
        fetchDoctors();

        const interval = setInterval(fetchDoctors, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleInfoToggle = (doctorId, type) => {
        if (selectedDoctorId === doctorId && visibleInfo === type) {
            setSelectedDoctorId(null);
            setVisibleInfo('');
        } else {
            setSelectedDoctorId(doctorId);
            setVisibleInfo(type);
        }
    };

    // SPECIALTIES FROM DATABASE
    const specialties = [
        'All Specialties',
        ...new Set(doctorsList.map(doc => doc.specialization).filter(Boolean))
    ];

    // FILTER LOGIC
    const filteredDoctors = doctorsList.filter((doctor) => {
        const matchesSearch =
            doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialty =
            selectedSpecialty === 'All Specialties' ||
            doctor.specialization === selectedSpecialty;

        return matchesSearch && matchesSpecialty;
    });

    return (
        <>
            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Doctor Directory</h1>
                    <p className="page-subtitle">
                        Manage hospital medical staff and availability
                    </p>
                </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="card mb-6">
                <div
                    className="card-header"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        background: 'var(--surface-hover)'
                    }}
                >
                    {/* SEARCH */}
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search
                            size={18}
                            style={{
                                position: 'absolute',
                                left: '12px',
                                top: '10px',
                                color: 'var(--text-light)'
                            }}
                        />

                        <input
                            type="text"
                            placeholder="Search doctors by name or specialty..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            style={{
                                paddingLeft: '38px',
                                width: '100%'
                            }}
                        />
                    </div>

                    {/* FILTER */}
                    <select
                        className="form-control"
                        style={{ width: '220px' }}
                        value={selectedSpecialty}
                        onChange={(e) =>
                            setSelectedSpecialty(
                                e.target.value
                            )
                        }
                    >
                        {specialties.map((specialty, index) => (
                            <option key={index} value={specialty}>
                                {specialty}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* RESULTS COUNT */}
            <div
                style={{
                    marginBottom: '20px',
                    color: 'var(--text-gray)',
                    fontSize: '14px'
                }}
            >
                Showing {filteredDoctors.length} doctor(s)
            </div>

            {/* DOCTOR CARDS */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '24px'
                }}
            >
                {filteredDoctors.map((doctor) => (
                    <div
                        key={doctor.doctor_id}
                        className="card"
                        style={{ padding: '24px' }}
                    >
                        {/* TOP */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '16px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '16px',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    className="avatar"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '20px',
                                        background:
                                            'var(--primary-light)',
                                        color: 'var(--primary)'
                                    }}
                                >
                                    {doctor.name
                                        ? doctor.name
                                              .substring(0, 2)
                                              .toUpperCase()
                                        : 'DR'}
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color:
                                                'var(--text-dark)'
                                        }}
                                    >
                                        {doctor.name}
                                    </h3>

                                    <div
                                        style={{
                                            color: 'var(--primary)',
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            marginTop: '4px'
                                        }}
                                    >
                                        <Stethoscope size={14} />
                                        {doctor.specialization}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STATUS */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                gap: '12px',
                                marginBottom: '20px',
                                padding: '16px',
                                background: 'var(--bg)',
                                borderRadius:
                                    'var(--radius-md)'
                            }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: '12px',
                                        color:
                                            'var(--text-gray)'
                                    }}
                                >
                                    Status
                                </div>

                                <div
                                    style={{ marginTop: '4px' }}
                                >
                                    <span
                                        className={`badge ${
                                            doctor.status ===
                                            'Available'
                                                ? 'badge-low'
                                                : doctor.status ===
                                                  'Busy'
                                                ? 'badge-high'
                                                : 'badge-outline'
                                        }`}
                                    >
                                        {doctor.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent:
                                    'space-between',
                                alignItems: 'center',
                                borderTop:
                                    '1px solid var(--border)',
                                paddingTop: '16px'
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '8px'
                                }}
                            >
                                {/* PHONE */}
                                <button
                                    className="action-btn"
                                    title="Show Phone"
                                    onClick={() =>
                                        handleInfoToggle(
                                            doctor.doctor_id,
                                            'phone'
                                        )
                                    }
                                    style={{
                                        background:
                                            'var(--primary-light)',
                                        color:
                                            'var(--primary)',
                                        padding: '6px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Phone size={16} />
                                </button>

                                {/* EMAIL */}
                                <button
                                    className="action-btn"
                                    title="Show Email"
                                    onClick={() =>
                                        handleInfoToggle(
                                            doctor.doctor_id,
                                            'email'
                                        )
                                    }
                                    style={{
                                        background:
                                            'var(--primary-light)',
                                        color:
                                            'var(--primary)',
                                        padding: '6px',
                                        borderRadius: '6px',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Mail size={16} />
                                </button>
                            </div>

                            {/* RATING */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    color:
                                        'var(--warning)',
                                    fontWeight: 600,
                                    fontSize: '14px'
                                }}
                            >
                                <Star
                                    size={16}
                                    fill="currentColor"
                                />
                                4.8
                            </div>
                        </div>

                        {/* SHOW INFO */}
                        {selectedDoctorId === doctor.doctor_id && (
                            <div
                                style={{
                                    marginTop: '12px',
                                    padding: '12px',
                                    background:
                                        'var(--surface-hover)',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    color:
                                        'var(--text-dark)'
                                }}
                            >
                                {visibleInfo === 'phone' && (
                                    <div>
                                        📞 {doctor.phone ||
                                            'No phone available'}
                                    </div>
                                )}

                                {visibleInfo === 'email' && (
                                    <div>
                                        ✉️ {doctor.email ||
                                            'No email available'}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}

                {/* EMPTY */}
                {filteredDoctors.length === 0 && (
                    <div
                        style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '40px',
                            color: 'var(--text-gray)'
                        }}
                    >
                        No doctors found matching your search/filter.
                    </div>
                )}
            </div>
        </>
    );
};

export default DoctorsPage;