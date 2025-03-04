import React, { useState, useEffect } from 'react';
import './ReviewForm.css';


// Composant réutilisable d'étoile
const Star = ({ filled, onHover, onClick }) => (
  <button
    type="button"
    className={`p-1 focus:outline-none ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    onMouseEnter={onHover}
    onMouseLeave={onHover}
    onClick={onClick}
    aria-label="Rating star"
  >
    <svg
      className="w-8 h-8 transition-colors duration-200"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  </button>
);

// Composant de notation
const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div 
      className="flex mt-4"
      role="group"
      aria-labelledby="star-rating-label"
    >
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <Star
            key={starValue}
            filled={starValue <= (hoverRating || rating)}
            onHover={() => setHoverRating(starValue)}
            onClick={() => setRating(starValue)}
          />
        );
      })}
    </div>
  );
};

const ReviewForm = () => {
  // Clé utilisée pour stocker les rendez-vous dans le localStorage
  const APPOINTMENTS_KEY = 'appointments';
  const [reviewRating, setReviewRating] = useState(0);
  // Récupérer les rendez-vous depuis le localStorage
  const getAppointmentsFromLocalStorage = () => {
    const storedAppointments = localStorage.getItem(APPOINTMENTS_KEY);
    return storedAppointments ? JSON.parse(storedAppointments) : [];
  };

  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [updatedAppointments, setUpdatedAppointments] = useState(getAppointmentsFromLocalStorage());

  // Sauvegarder les rendez-vous dans le localStorage à chaque mise à jour
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
            rating: reviewRating  }
          : appointment
      );
      setUpdatedAppointments(updatedAppointmentsList);
      setSelectedAppointmentId(null);
      setReviewRating(0);
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
             <StarRating
              rating={reviewRating}
              setRating={setReviewRating}
            />
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