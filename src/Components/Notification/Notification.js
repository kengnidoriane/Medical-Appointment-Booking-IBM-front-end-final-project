import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Effet pour récupérer les données du rendez-vous depuis localStorage
  useEffect(() => {
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
      setShowNotification(true);
    }
  }, []);

  // Effet pour écouter les changements dans localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
      if (!storedAppointmentData) {
        setAppointmentData(null);
        setShowNotification(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      {showNotification && appointmentData && (
        <div className="notification-container">
          <div className="notification-card">
            <h3 className="notification-title">Appointment Details</h3>
            <p className="notification-message">
              <strong>Doctor:</strong> {appointmentData.doctorName}
            </p>
            <p className="notification-message">
              <strong>Speciality:</strong> {appointmentData.doctorSpeciality}
            </p>
            <p className="notification-message">
              <strong>Patient:</strong> {appointmentData.patientName}
            </p>
            <p className="notification-message">
              <strong>Phone Number:</strong> {appointmentData.patientPhone}
            </p>
            <p className="notification-message">
              <strong>Date:</strong> {appointmentData.date}
            </p>
            <p className="notification-message">
              <strong>Time:</strong> {appointmentData.time}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
