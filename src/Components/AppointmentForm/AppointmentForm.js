import React, { useState } from 'react'

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date, setDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [errors, setErrors] = useState({});
     const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!date) newErrors.date = 'Date is required';
        if (!selectedSlot) newErrors.slot = 'Time slot is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };


  // Soumission du formulaire
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ name, phoneNumber, date, selectedSlot });
      setName('');
      setPhoneNumber('');
      setDate('');
      setSelectedSlot('');
      setErrors({});
    }
  };

    return (
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        {errors.name && <span className='error'>{errors.name}</span>}

        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            maxLength={10}
            required
          />
        </div>
        {errors.phoneNumber && <span className='error'>{errors.phoneNumber}</span>}
        <div className="form-group">
          <label htmlFor="date">Date of Appointment:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='dd----yyyy'
            required
          />
        </div>
        {errors.date && <span className='error'>{errors.date}</span>}

        <div className='form-group'>
            <label htmlFor='timeSlot'>Select Time Slot:</label>
            <select
                id='timeSlot'
                value={selectedSlot}
                onChange={(e) => handleSlotSelection(e.target.value)}
                required>
                <option value=''></option>
                {
                    timeSlots.map((slot, index) => (
                        <option>
                            {slot}
                        </option>
                    ))
                }

            </select>
            {errors.slot && <span className='error'>{errors.slot}</span>}
        </div>

        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm;
