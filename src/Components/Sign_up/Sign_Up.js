// Following code has been commented with appropriate comments for your reference.
import { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState("patient" || "doctor");
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{marginTop:'35%'}}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <h2>Sign up</h2>
                        <div className="form-group">
                          <label htmlFor="role">Role</label>
                          <select
                            id="role"
                            name="role"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="">Select your role</option>
                            <option value="patient">patient</option>
                            <option value="doctor">Doctor</option>
                          </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Name</label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Enter your name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              aria-describedby="helpId"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="Enter your phone number"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              maxLength="10"
                              aria-describedby="helpId"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                              type="password"
                              id="password"
                              name="password"
                              placeholder="Enter your password"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              aria-describedby="helpId"
                            />
                        </div>
                        {/* Apply similar logic for other form elements like name, phone, and password to capture user information */}
                        <div className='btn-group'>
                          <button type="submit">Submit</button>
                          <button type="reset" >Reset</button>
                        </div>
                    </form> <br></br>
                    <p><small>Already a member? </small><span className='login_link'><Link to="/login" style={{ color: '#3685fb', textDecoration: 'none', fontWeight: 500 }} >Login</Link></span> </p>

                </div>
            </div>
        </div>
        /* Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code. */
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components