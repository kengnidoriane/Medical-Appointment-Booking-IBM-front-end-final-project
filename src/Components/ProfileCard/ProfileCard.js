import React, { useState } from 'react';
import './ProfileCard.css';

const ProfileCard = ({ user, onUpdateUser }) => {
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => {
    setIsEditPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(editedUser); // Envoyer les informations mises à jour au parent
    setIsEditPopupOpen(false);

    // Afficher la boîte de dialogue de confirmation
    window.alert('Les modifications ont été enregistrées avec succès !');

    // Rediriger vers la page d'accueil
    window.location.href = '/';
  };

  const handleCancel = () => {
    setIsEditPopupOpen(false);
    setEditedUser({ ...user }); // Réinitialiser les modifications
  };

  return (
    <div className="profile-card">
      <h2 className="profile-card-welcome">Welcome, {user.username}!</h2>
      <div className="profile-card-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </div>
      <button className="profile-card-edit-button" onClick={handleEditClick}>
        Edit
      </button>

      {isEditPopupOpen && (
        <div className="profile-card-popup-overlay">
          <div className="profile-card-popup">
            <h3 className="profile-card-popup-title">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="profile-card-popup-field">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={editedUser.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-popup-field">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-popup-field">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profile-card-popup-buttons">
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
