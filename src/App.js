import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
import SignUp from './Components/Sign_up/Sign_Up';
import Login from './Components/Login/Login';
import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';
import Notification from './Components/Notification/Notification';
import ReviewForm from './ReviewForm/ReviewForm';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';
import Service from './Components/Services/Service';
import ProfileForm from './Components/ProfileCard/ProfileCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <Notification />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path="/instant-consultation" element={<InstantConsultation />} />
          <Route path="/booking-consultation" element={<BookingConsultation />} />
          <Route path='/services' element={<Service />} />
          <Route path='/reviews' element={<ReviewForm />} />
          <Route path='/reports' element={<ReportsLayout />} />
          <Route path='/profile' element={<ProfileForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
