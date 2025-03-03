import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = () => {
  const [appointmentDatas, setAppointmentDatas] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Effet pour récupérer les données du rendez-vous depuis localStorage
  useEffect(() => {
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));
    console.log('Appointmentdata:',storedAppointmentData);

    if (storedAppointmentData) {
      setAppointmentDatas(storedAppointmentData);
    console.log('Appointmentdata:',storedAppointmentData);

      setShowNotification(true);
    }
  }, []);

  // Effet pour écouter les changements dans localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));
      if (!storedAppointmentData) {
        setAppointmentDatas(null);
        setShowNotification(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      {showNotification && appointmentDatas.map((appointmentData) =>
        (
          <div className="notification-container" key={appointmentData.id}>
          <div className="notification-card">
            <h3 className="notification-title">Appointment Details</h3>
            <p className="notification-message">
              <strong>Doctor:</strong> {appointmentData.doctorName}
            </p>
            <p className="notification-message">
              <strong>Speciality:</strong> doctor
            </p>
            <p className="notification-message">
              <strong>Patient:</strong> {appointmentData.name}
            </p>
            <p className="notification-message">
              <strong>Phone Number:</strong> {appointmentData.phoneNumber}
            </p>
            <p className="notification-message">
              <strong>Date:</strong> {appointmentData.date}
            </p>
            <p className="notification-message">
              <strong>Time:</strong> {appointmentData.time}
            </p>
          </div>
        </div>
        )
      )}
    </>
  );
};

export default Notification;
