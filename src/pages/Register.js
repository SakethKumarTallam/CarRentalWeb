// import React from "react";
// import { Row, Col, Form, Input } from "antd";
// import { Link } from "react-router-dom";
// import {useDispatch , useSelector} from 'react-redux'
// import { userRegister } from "../redux/actions/userActions";
// import AOS from 'aos';
// import Spinner from '../components/Spinner';
// import 'aos/dist/aos.css'; // You can also use <link> for styles
// // ..
// AOS.init()
// function Register() {
//   const dispatch = useDispatch()
//   const {loading} = useSelector(state=>state.alertsReducer)
//     function onFinish(values) {
//            dispatch(userRegister(values))
//            console.log(values)
//     }

//   return (
//     <div className="login">
//       {loading && (<Spinner />)}
//       <Row gutter={16} className="d-flex align-items-center">
//         <Col lg={16} style={{ position: "relative" }}>
//           <img 
//            className='w-100'
//            data-aos='slide-left'
//            data-aos-duration='1500'
//           src="https://images.unsplash.com/photo-1584936684506-c3a7086e8212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1694&q=80" />
//           <h1 className="login-logo">Car Rental</h1>
//         </Col>
//         <Col lg={8} className="text-left p-5">
//           <Form layout="vertical" className="login-form p-5" onFinish={onFinish}>
//             <h1>Register</h1>
//             <hr />
//             <Form.Item
//               name="username"
//               label="Username"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>
//             <Form.Item
//               name="cpassword"
//               label="Confirm Password"
//               rules={[{ required: true }]}
//             >
//               <Input />
//             </Form.Item>

//             <button className="btn1 mt-2 mb-3">Register</button>
//             <br />

//             <Link to="/login">Click Here to Login</Link>
//           </Form>
//         </Col>
//       </Row>
//     </div>
//   );
// }

// export default Register;


import React, { useState } from 'react';
import './Signup.css';
import backgroundImage from './mountain_img.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

export default function Register() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);

  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmpass: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Optional: check if password & confirm match
    if (form.password !== form.confirmpass) {
      return alert('Passwords do not match');
    }

    // Dispatch the redux action
    dispatch(userRegister({
      username: form.username,
      password: form.password,
    }));
  };

  return (
    <div className="page-wrapper" style={{ width: "100vw" }}>
      {loading && <Spinner />}
      <div className="card-container">
        <div
          className="image-section"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="form-section">
          <header className="signup-header">
            <div className="logo">
              <span className="clr">Car Rental</span> - Hassle Free Renting System
            </div>
            <div></div>
          </header>

          <main className="signup-content">
            <small className="signup-tagline">START FOR FREE</small>
            <h1>Register here<span className="dot">.</span></h1>
            <p className="login-link">
              Already A Member? <Link to="/login">Log In</Link>
            </p>

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="field">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>

              <div className="field">
                <label>Password</label>
                <div className="password-input">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label>Confirm Password</label>
                <div className="password-input">
                  <input
                    type="password"
                    name="confirmpass"
                    value={form.confirmpass}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="actions">
                <button type="submit" className="btn-primary">
                  Create account
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}


