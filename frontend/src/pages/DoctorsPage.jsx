import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Stethoscope, Star } from 'lucide-react';

const DoctorsPage = () => {
    const [doctorsList, setDoctorsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

    const fetchDoctors = async () => {
        try {
            const res = await fetch('/doctors');
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) setDoctorsList(data);
            }
        } catch (err) {
            console.error('Error fetching doctors:', err);
        }
    };

    useEffect(() => {
        fetchDoctors();
        const interval = setInterval(fetchDoctors, 5000);
        return () => clearInterval(interval);
    }, []);

    // Functional handlers
    const handleCall = (phone) => {
        if (phone) window.open(`tel:${phone.replace(/[^\d+]/g, '')}`, '_self');
    };

    const handleEmail = (email) => {
        if (email) window.open(`mailto:${email}`, '_blank');
    };

    // Unique specialties from DB data
    const specialties = [
        'All Specialties',
        ...new Set(doctorsList.map(d => d.specialization).filter(Boolean))
    ].sort((a, b) => a === 'All Specialties' ? -1 : a.localeCompare(b));

    // Filter doctors
    const filteredDoctors = doctorsList.filter((doctor) => {
        const q = searchTerm.toLowerCase();
        const matchesSearch =
            doctor.name?.toLowerCase().includes(q) ||
            doctor.specialization?.toLowerCase().includes(q);
        const matchesSpecialty =
            selectedSpecialty === 'All Specialties' ||
            doctor.specialization === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const getStatusStyle = (status) => {
        if (status === 'Available') return { bg: '#f0fdf4', color: '#15803d' };
        if (status === 'Busy')      return { bg: '#fef2f2', color: '#dc2626' };
        return { bg: '#f9fafb', color: '#6b7280' };
    };

    return (
        <>
            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Doctor Directory</h1>
                    <p className="page-subtitle">Manage hospital medical staff and availability</p>
                </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="card mb-6">
                <div
                    className="card-header"
                    style={{ display: 'flex', gap: '16px', background: 'var(--surface-hover)', flexWrap: 'wrap' }}
                >
                    {/* SEARCH */}
                    <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
                        <Search
                            size={18}
                            style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-light)' }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name or specialty..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '38px', width: '100%' }}
                        />
                    </div>

                    {/* SPECIALTY FILTER */}
                    <select
                        className="form-control"
                        style={{ width: '220px' }}
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                        {specialties.map((s, i) => (
                            <option key={i} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* RESULTS COUNT */}
            <div style={{ marginBottom: '20px', color: 'var(--text-gray)', fontSize: '14px' }}>
                Showing <strong>{filteredDoctors.length}</strong> of {doctorsList.length} doctor(s)
                {selectedSpecialty !== 'All Specialties' && ` · ${selectedSpecialty}`}
            </div>

            {/* DOCTOR CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {filteredDoctors.map((doctor) => {
                    const statusStyle = getStatusStyle(doctor.status);
                    const initials = doctor.name
                        ? doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
                        : 'DR';

                    return (
                        <div key={doctor.doctor_id} className="card" style={{ padding: '20px' }}>

                            {/* AVATAR + NAME */}
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '16px' }}>
                                <div
                                    style={{
                                        width: '52px', height: '52px', borderRadius: '50%',
                                        background: 'var(--primary-light)', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: '16px', flexShrink: 0
                                    }}
                                >
                                    {initials}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>
                                        {doctor.name}
                                    </h3>
                                    <div style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                                        <Stethoscope size={13} />
                                        {doctor.specialization}
                                    </div>
                                </div>
                            </div>

                            {/* STATUS BADGE */}
                            <div style={{ marginBottom: '16px' }}>
                                <span style={{
                                    display: 'inline-block',
                                    padding: '3px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    background: statusStyle.bg,
                                    color: statusStyle.color
                                }}>
                                    ● {doctor.status || 'Available'}
                                </span>
                            </div>

                            {/* DIVIDER */}
                            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between' }}>

                                    {/* ACTION BUTTONS */}
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {/* PHONE BUTTON */}
                                        <button
                                            title={doctor.phone || 'No phone'}
                                            onClick={() => handleCall(doctor.phone)}
                                            style={{
                                                background: 'var(--primary-light)',
                                                color: 'var(--primary)',
                                                padding: '6px 10px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                cursor: doctor.phone ? 'pointer' : 'not-allowed',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                opacity: doctor.phone ? 1 : 0.5
                                            }}
                                        >
                                            <Phone size={13} />
                                            Call
                                        </button>

                                        {/* GMAIL BUTTON */}
                                        <button
                                            title={doctor.email || 'No email'}
                                            onClick={() => handleEmail(doctor.email)}
                                            style={{
                                                background: '#ecfdf5',
                                                color: '#059669',
                                                padding: '6px 10px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                cursor: doctor.email ? 'pointer' : 'not-allowed',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                fontSize: '12px',
                                                fontWeight: 500,
                                                opacity: doctor.email ? 1 : 0.5
                                            }}
                                        >
                                            <Mail size={13} />
                                            Gmail
                                        </button>
                                    </div>

                                    {/* RATING */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--warning)', fontWeight: 600, fontSize: '13px' }}>
                                        <Star size={14} fill="currentColor" />
                                        4.8
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* EMPTY STATE */}
                {filteredDoctors.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: 'var(--text-gray)' }}>
                        No doctors found matching your search or filter.
                    </div>
                )}
            </div>
        </>
    );
};

export default DoctorsPage;