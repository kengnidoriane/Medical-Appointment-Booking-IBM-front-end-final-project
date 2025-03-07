import React, { useState, useEffect } from 'react';
import './ReportsLayout.css'; // Fichier CSS pour le style
import { Eye, Download } from 'lucide-react'; // Icônes pour les boutons

export default function ReportsLayout() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Récupérer les rendez-vous depuis le localStorage au montage du composant
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    setAppointments(storedAppointments);
  }, []);

  // Fonction pour visualiser le rapport
  const handleViewReport = (reportUrl) => {
    if (reportUrl) {
      window.open(reportUrl, '_blank'); // Ouvre le rapport dans un nouvel onglet
    }
  };

  // Fonction pour télécharger le rapport
  const handleDownloadReport = (reportUrl) => {
    if (reportUrl) {
      const link = document.createElement('a');
      link.href = reportUrl;
      link.download = 'report.pdf'; // Nom du fichier à télécharger
      link.click();
    }
  };

  return (
    <div className="reports-layout">
      <h2>Your Reports</h2>
      {appointments.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{index + 1}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.doctorSpeciality}</td>
                <td>
                  <button
                    className="view-report-btn"
                    onClick={() => handleViewReport(appointment.reportUrl)}
                    disabled={!appointment.reportUrl}
                  >
                    <Eye size={16} /> View Report
                  </button>
                </td>
                <td>
                  <button
                    className="download-report-btn"
                    onClick={() => handleDownloadReport(appointment.reportUrl)}
                    disabled={!appointment.reportUrl}
                  >
                    <Download size={16} /> Download Report
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
