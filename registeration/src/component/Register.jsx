import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sending data to server...");
        
        try {
            const response = await fetch('https://cseastudentapp-backend-gmdy.onrender.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                console.error("Error:", response.status);
                alert("Something went wrong");
                return;
            }

            const data = await response.json();
            console.log(data);
            if (data.status === 200) {
                alert('User registered successfully');
            }
        } catch (error) {
            console.error("Fetch error:", error);
            alert("Failed to connect to server");
        }
    };

    return (
        <>
         <h4>Registration Form</h4>
        <Form onSubmit={handleSubmit}> 
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </>
    );
};

export default Register;
