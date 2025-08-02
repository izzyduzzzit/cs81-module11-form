// Izarra Villareal CS 81 JavaScript Module 11 Assignment 11A: React Contact Form

// GitHub URL: https://github.com/izzyduzzzit/cs81-module11-form

import React, { useState } from 'react';
import styles from './ContactForm.module.css';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(formData.phone)) newErrors.phone = 'Invalid phone';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedData(formData);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input 
            className={styles.input}
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input 
            className={styles.input}
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone:</label>
          <input 
            className={styles.input}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Message:</label>
          <textarea 
            className={styles.textarea}
            name="message" 
            rows="5" 
            value={formData.message} 
            onChange={handleChange}
          ></textarea>
          {errors.message && <p className={styles.error}>{errors.message}</p>}
        </div>

        <button className={styles.button} type="submit">Submit</button>
      </form>

      {submittedData && (
        <div className={styles.results}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ContactForm;
