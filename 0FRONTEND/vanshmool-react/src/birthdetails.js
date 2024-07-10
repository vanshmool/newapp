import React, { useState, useEffect } from 'react';


function Birthdetails() {
  
  const [formData, setFormData] = useState({
    name: '',
    pob: '',
    tob: '',
    dob: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [userData, setUserData] = useState({
    image_url: '',
    promptfordalle: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://52.66.87.140:8000/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(response)

      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody.promptfordalle)
        setUserData({
          image_url: responseBody.image_url,
          promptfordalle: responseBody.personality_description
        });
      setIsResponseOk(true); // Set the state to true if response is ok

      } else {
        console.log('Failed:', response.status);
        setIsResponseOk(false); // Set the state to false if response is not ok

        // Additional error handling
      }
    } catch (error) {
      console.error('Error:', error);
      setIsResponseOk(false); // Set the state to false if an error occurs

      // Handle any errors
    }
  };

  // New state to determine if the fetch was successful
  const [isResponseOk, setIsResponseOk] = useState(null);

  return (
  <div>
      <nav>
            <div className="navbar bg-base-100 shadow-lg">   
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                    <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img alt="Vansh Mool" src="./images/vedicastrologyimage1.png" />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex-1">
                <a className="btn btn-ghost text-xl">Vansh Mool</a>
                </div>
                <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
                </div>
                <label className="cursor-pointer grid place-items-center">
                    <input type="checkbox" value="luxury" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
        </nav>

    <div className="text-center mt-10">
                  <h1 className="text-3xl font-light">Enter the details</h1>
                  <h3 className="text-1xl font-light">This uses Vedic Astrology to generate the persona of a person.</h3>                
    </div>
      
    <div className="grid grid-cols-[40%_60%] gap-4 mt-5">
      <div className="hero col-auto p-3 m-2">
              <div className="card flex-shrink-0 w-full items-left max-w-md shadow-2xl bg-base-100">
                <div className="card-body "> 
                  <form id="Birthdetails" onSubmit={handleSubmit}>
                    <h3 className="text-1xl font-light">Add the details to generate the character of the person.</h3>
                      <br />
                      <label htmlFor="name">Your Name</label>
                      <br />
                      <input
                        type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange} 
                          placeholder="Enter Your Name"
                          className="input input-bordered w-full"
                      />
                      <br />
                      <label htmlFor="pob">Place Of Birth</label>
                      <br />
                      <input  
                          type="text"
                          name="pob"
                          value={formData.pob}
                          onChange={handleChange} 
                          placeholder="Enter Place of Birth"
                          className="input input-bordered w-full"
                      />
                      <br />
                      <label htmlFor="dob">Date of Birth</label>
                      <br />
                      <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange} 
                          placeholder="Enter Date of Birth"
                          className="input input-bordered w-full"
                      />
                      <br />
                      <label htmlFor="tob">Time Of Birth</label>
                      <br />
                      <input  
                          type="time"
                          name="tob"
                          value={formData.tob}
                          onChange={handleChange} 
                          placeholder="Enter Time of Birth"
                          className="input input-bordered w-full"
                      />
                      <br />
                      <label htmlFor="gender">Gender</label>
                      <br />
                      <input  
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange} 
                          placeholder="Enter the Gender"
                          className="input input-bordered w-full"
                      />
                      <br />
                      <br />
                      <button type="submit" className="btn btn-active btn-primary">Submit</button>
                      <br />
                      <br />
                    </form>
                  </div>
          </div>
      </div>
      {isResponseOk === null ? (
          // Display skeleton loader when isResponseOk is null
          <div className="flex justify-normal items-center h-full col-auto p-3 m-2">
            <div className="card-body"> 
              <div className="flex flex-col gap-4 w-5/6 mt-1">
                <div className="flex gap-4 items-center">
                  <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-20"></div>
                    <div className="skeleton h-4 w-28"></div>
                  </div>
                </div>
                <div className="skeleton h-64 w-full"></div>
                <div className="skeleton h-4 w-1/2"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            </div>
          </div>
        ) : isResponseOk ? (
          // Display data when isResponseOk is true
          <div className="flex justify-normal items-center h-full col-auto p-3 m-2">
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
              <figure><img src={userData.image_url} alt="User" /></figure>
              <div className="card-body">
                <h2 className="card-title">Your Persona</h2>
                <p>{userData.promptfordalle}</p>
              </div>
            </div>
          </div>
        ) : (
          // Display an error message when isResponseOk is false
          <div className="flex justify-normal items-center h-full col-auto p-3 m-2">
            <p>There was an error processing your request.</p>
          </div>
        )}
      </div>
  </div>

  );
}
export default Birthdetails