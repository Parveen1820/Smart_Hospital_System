import React, { useState, useEffect } from 'react';
import { Search, Phone, Mail, Stethoscope, Star, ChevronDown, ChevronUp } from 'lucide-react';

const SPECIALTIES = [
    'All Specialties',
    'Cardiac', 'Trauma', 'Eye', 'Diabetes', 'Neuro',
    'Ortho', 'Pediatric', 'General', 'Skin', 'ENT',
    'Pulmonary', 'Gastro', 'Oncology', 'Urology', 'Emergency'
];

const DoctorsPage = () => {
    const [doctorsList, setDoctorsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
    const [expandedId, setExpandedId] = useState(null);

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

    const toggleExpand = (id) => setExpandedId(prev => prev === id ? null : id);

    // Filter: search by name (any letter), specialization; filter by dropdown
    const filteredDoctors = doctorsList.filter((doctor) => {
        const q = searchTerm.toLowerCase();
        const matchesSearch = !q ||
            doctor.name?.toLowerCase().includes(q) ||
            doctor.specialization?.toLowerCase().includes(q);
        const matchesSpecialty =
            selectedSpecialty === 'All Specialties' ||
            doctor.specialization === selectedSpecialty;
        return matchesSearch && matchesSpecialty;
    });

    const getStatusStyle = (status) => {
        if (status === 'Available') return { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' };
        if (status === 'Busy')      return { bg: '#fef2f2', color: '#dc2626', dot: '#ef4444' };
        return { bg: '#f9fafb', color: '#6b7280', dot: '#9ca3af' };
    };

    const getInitials = (name) =>
        name ? name.replace('Dr. ', '').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'DR';

    const specialtyColors = {
        'Cardiac': '#fee2e2', 'Trauma': '#fef3c7', 'Eye': '#e0f2fe',
        'Diabetes': '#f3e8ff', 'Neuro': '#ecfdf5', 'Ortho': '#fff7ed',
        'Pediatric': '#fce7f3', 'General': '#f0f9ff', 'Skin': '#fef9c3',
        'ENT': '#f0fdf4', 'Pulmonary': '#e0f2fe', 'Gastro': '#fdf4ff',
        'Oncology': '#fef2f2', 'Urology': '#f0fdf4', 'Emergency': '#fff1f2'
    };

    return (
        <>
            {/* HEADER */}
            <div className="page-header">
                <div>
                    <h1 className="page-title">Doctor Directory</h1>
                    <p className="page-subtitle">50 specialist doctors · Click the arrow to view contact details</p>
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-gray)', background: 'var(--surface-hover)', padding: '8px 16px', borderRadius: '8px' }}>
                    Total: <strong>{doctorsList.length}</strong> Doctors
                </div>
            </div>

            {/* SEARCH + FILTER */}
            <div className="card mb-6" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', padding: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* SEARCH */}
                    <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                        <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                        <input
                            type="text"
                            placeholder="Search by name (e.g. K, Ra, Priya)..."
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '36px', width: '100%' }}
                        />
                    </div>

                    {/* SPECIALTY FILTER DROPDOWN */}
                    <select
                        className="form-control"
                        style={{ width: '200px' }}
                        value={selectedSpecialty}
                        onChange={(e) => setSelectedSpecialty(e.target.value)}
                    >
                        {SPECIALTIES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>

                    {/* CLEAR BUTTON */}
                    {(searchTerm || selectedSpecialty !== 'All Specialties') && (
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedSpecialty('All Specialties'); }}
                            style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontSize: '13px', color: 'var(--text-gray)' }}
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* RESULTS COUNT */}
            <div style={{ marginBottom: '20px', color: 'var(--text-gray)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>Showing <strong style={{ color: 'var(--text-dark)' }}>{filteredDoctors.length}</strong> of {doctorsList.length} doctors</span>
                {selectedSpecialty !== 'All Specialties' && (
                    <span style={{ padding: '2px 10px', borderRadius: '20px', background: 'var(--primary-light)', color: 'var(--primary)', fontSize: '12px', fontWeight: 600 }}>
                        {selectedSpecialty}
                    </span>
                )}
            </div>

            {/* SPECIALTY QUICK-FILTER PILLS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                {SPECIALTIES.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSelectedSpecialty(s)}
                        style={{
                            padding: '4px 14px',
                            borderRadius: '20px',
                            border: '1px solid',
                            borderColor: selectedSpecialty === s ? 'var(--primary)' : 'var(--border)',
                            background: selectedSpecialty === s ? 'var(--primary)' : 'white',
                            color: selectedSpecialty === s ? 'white' : 'var(--text-gray)',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: selectedSpecialty === s ? 600 : 400,
                            transition: 'all 0.15s'
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* DOCTOR CARDS GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '20px' }}>
                {filteredDoctors.map((doctor) => {
                    const statusStyle = getStatusStyle(doctor.status);
                    const isExpanded = expandedId === doctor.doctor_id;
                    const cardAccent = specialtyColors[doctor.specialization] || '#f0f9ff';

                    return (
                        <div
                            key={doctor.doctor_id}
                            className="card"
                            style={{
                                padding: '0',
                                overflow: 'hidden',
                                transition: 'box-shadow 0.2s',
                                border: '1px solid var(--border)'
                            }}
                        >
                            {/* SPECIALTY COLOR BANNER */}
                            <div style={{ height: '6px', background: cardAccent, borderBottom: '1px solid var(--border)' }} />

                            <div style={{ padding: '18px' }}>
                                {/* AVATAR + NAME ROW */}
                                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        background: 'var(--primary-light)', color: 'var(--primary)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontWeight: 700, fontSize: '15px', flexShrink: 0
                                    }}>
                                        {getInitials(doctor.name)}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-dark)', margin: '0 0 3px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {doctor.name}
                                        </h3>
                                        <div style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Stethoscope size={12} />
                                            {doctor.specialization}
                                        </div>
                                    </div>
                                </div>

                                {/* STATUS + RATING ROW */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                    <span style={{
                                        padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                                        background: statusStyle.bg, color: statusStyle.color, display: 'flex', alignItems: 'center', gap: '5px'
                                    }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusStyle.dot, display: 'inline-block' }} />
                                        {doctor.status || 'Available'}
                                    </span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#f59e0b', fontSize: '12px', fontWeight: 600 }}>
                                        <Star size={13} fill="currentColor" /> 4.8
                                    </div>
                                </div>

                                {/* EXPAND TOGGLE ARROW BUTTON */}
                                <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                                    <button
                                        onClick={() => toggleExpand(doctor.doctor_id)}
                                        style={{
                                            width: '100%', padding: '7px', borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            background: isExpanded ? 'var(--primary-light)' : 'white',
                                            color: isExpanded ? 'var(--primary)' : 'var(--text-gray)',
                                            cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                                            transition: 'all 0.15s'
                                        }}
                                    >
                                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                                        {isExpanded ? 'Hide Contact Info' : 'Show Contact Info'}
                                    </button>

                                    {/* EXPANDED CONTACT INFO */}
                                    {isExpanded && (
                                        <div style={{
                                            marginTop: '12px', padding: '12px', borderRadius: '8px',
                                            background: 'var(--bg)', border: '1px solid var(--border)',
                                            display: 'flex', flexDirection: 'column', gap: '10px'
                                        }}>
                                            {/* PHONE */}
                                            <a
                                                href={`tel:${doctor.phone?.replace(/[^\d+]/g, '')}`}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '10px',
                                                    padding: '8px 12px', borderRadius: '8px',
                                                    background: 'var(--primary-light)', color: 'var(--primary)',
                                                    textDecoration: 'none', fontSize: '13px', fontWeight: 500
                                                }}
                                            >
                                                <Phone size={15} />
                                                <span>{doctor.phone || 'Not available'}</span>
                                            </a>

                                            {/* EMAIL */}
                                            <a
                                                href={`mailto:${doctor.email}`}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '10px',
                                                    padding: '8px 12px', borderRadius: '8px',
                                                    background: '#ecfdf5', color: '#059669',
                                                    textDecoration: 'none', fontSize: '13px', fontWeight: 500
                                                }}
                                            >
                                                <Mail size={15} />
                                                <span>{doctor.email || 'Not available'}</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* EMPTY STATE */}
                {filteredDoctors.length === 0 && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px', color: 'var(--text-gray)' }}>
                        <Stethoscope size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                        <div style={{ fontSize: '16px', fontWeight: 500 }}>No doctors found</div>
                        <div style={{ fontSize: '13px', marginTop: '4px' }}>Try a different name or specialty</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default DoctorsPage;