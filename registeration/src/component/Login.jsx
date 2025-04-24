import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false); // Track loading state

  async function sendData(e) {
    e.preventDefault(); // Prevent form from reloading

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    setLoading(true); // Disable button while sending request

    try {
      const response = await fetch("http://localhost:3078/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email & password
      });
      const data = await response.json();
      const {status,message}=data;

      if(status===200){
        setTimeout(()=>{
          navigate('/dashboard')
        },1000)
      }
      alert(message);
     


      
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
  }
}

  return (
    <>
      <h4>Login Form</h4>
      <Form onSubmit={sendData}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </Button>
      </Form>
    </>
  );
}

export default Login;
