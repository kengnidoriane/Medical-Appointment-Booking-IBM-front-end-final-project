import React, { useState, useEffect } from 'react';
import './ReviewForm.css';
import StarRating from './star-rating';


const ReviewForm = () => {
  const APPOINTMENTS_KEY = 'appointments';
  const getAppointmentsFromLocalStorage = () => {
    const storedAppointments = localStorage.getItem(APPOINTMENTS_KEY);
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  };

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [updatedAppointments, setUpdatedAppointments] = useState(getAppointmentsFromLocalStorage());

  useEffect(() => {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updatedAppointments));
  }, [updatedAppointments]);

  const handleGiveReviewClick = (id) => {
    setSelectedAppointmentId(id);
  };

  const handleSubmitReview = () => {
    if (selectedAppointmentId) {
      const updatedAppointmentsList = updatedAppointments.map((appointment) =>
        appointment.id === selectedAppointmentId
          ? { ...appointment,
            review: `${reviewName}: ${reviewText}`,
            // rating: reviewRating  }
          }
          : appointment
      );
      setUpdatedAppointments(updatedAppointmentsList);
      setSelectedAppointmentId(null);
      setReviewName('');
      setReviewText('');
    }
  };

  return (
    <div className="review-form-container">
      <h2 className="review-form-title">Review Your Appointments</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Review</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {updatedAppointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td>{index + 1}</td>
              <td>{appointment.doctorName}</td>
              <td>{appointment.doctorSpeciality}</td>
              <td>
                {!appointment.review ? (
                  <button
                    className="give-review-button"
                    onClick={() => handleGiveReviewClick(appointment.id)}
                  >
                    Give Review
                  </button>
                ) : (
                  <button className="give-review-button" disabled>
                    Give Review
                  </button>
                )}
              </td>
              <td>{appointment.review || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAppointmentId && (
        <div className="review-popup-overlay">
          <div className="review-popup">
            <h3 className="review-popup-title">Give Your Review</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="review-popup-input"
            />
            <textarea
              placeholder="Your Review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="review-popup-textarea"
            />
            <StarRating />
            <div className="review-popup-buttons">
              <button
                className="review-popup-cancel-button"
                onClick={() => setSelectedAppointmentId(null)}
              >
                Cancel
              </button>
              <button
                className="review-popup-submit-button"
                onClick={handleSubmitReview}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;