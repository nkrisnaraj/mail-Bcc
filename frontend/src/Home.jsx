import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './Home.css'; // Import the CSS file

const Home = () => {
    const [formData, setFormData] = useState({
        subject: '',
        body: '',
        receiversMails: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Split receivers' emails into an array
        const receiversArray = formData.receiversMails
            .split(',')
            .map(email => email.trim())
            .filter(email => email); // Filter out empty values
        
        if (receiversArray.length === 0) {
            alert('Please provide at least one valid email address.');
            return;
        }
    for(const receiversMail of receiversArray){

    
        const dataToSubmit = {
            subject: formData.subject,
            body: formData.body,
            receiversMails: receiversMail // Send as comma-separated string
        };
        try {
            const response = await axios.post('http://localhost:5000/api/send-email', dataToSubmit);
    
            if (response.status === 200) {
                console.log('Email sent successfully');
            } else {
                alert('Failed to send email');
            }
    
            console.log(response.data); // You can handle the response from the server here
    
        } catch (error) {
            console.error('Error sending data:', error);
            alert('Error sending email');
        }
        console.log("dataToSubmit: ",dataToSubmit);
    }
        
        
    };
    
    

    return (
        <div className="home-container">
            <Form onSubmit={handleSubmit} className="email-form">
                <table className="form-table">
                    <tbody>
                        <tr>
                            <td>
                                <Form.Label>Subject</Form.Label>
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Body</Form.Label>
                            </td>
                            <td>
                                <Form.Control
                                    as="textarea"
                                    rows={15}
                                    placeholder="Enter email body"
                                    name="body"
                                    value={formData.body}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label>Receivers' Emails</Form.Label>
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter receivers' email addresses (comma-separated)"
                                    name="receiversMails"
                                    value={formData.receiversMails}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="text-center">
                                <Button variant="primary" type="submit" className="send-button">
                                    Send Email
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Form>
        </div>
    );
};

export default Home;
