import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import TextField from '@mui/material/TextField';

function Birthdetails() {
  const [formData, setFormData] = useState({
    name: '',
     pob: '',
     dtob: dayjs(new Date()) 
  });
   
  const handleChange = (e) => {
    const { name, value } = e.target ? e.target : { name: 'dob', value: e };
    const newValue = name === 'dob' ? dayjs(value) : value;
    setFormData(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const responseBody = await response.json();
        console.log('Success:', responseBody);
        // Additional success handling
      } else {
        console.log('Failed:', response.status);
        // Additional error handling
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle any errors
    }
  }; // Added missing closing brace


  return (
    <form id="Birthdetails" onSubmit={handleSubmit}>
      {/* form inputs */}
              
      <label htmlFor="name">Your Name</label>
      <br />
       <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange} // Attached here
        placeholder="Enter Name"
        className="input input-bordered"
      />
      <br />
      <label htmlFor="dob">Place Of Birth</label>
      <br />
      <input  
        type="text"
        name="pob"
        value={formData.pob}
        onChange={handleChange} // Attached here
        placeholder="Enter Place of Birth"
        className="input input-bordered"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
      <DateTimePicker
          label="Select the correct Date and Time of birth"
          value={formData.dtob}
          onChange={handleChange}
      />
      </DemoContainer>
      </LocalizationProvider>
    
    </form>
  );
}

export default Birthdetails; // Moved export statement here
