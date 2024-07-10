import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Birthdetails from './birthdetails'; // Ensure the file name is correct and capitalized

import './output.css'; // Make sure the path to your CSS file is correct
import LoginPage from './login';
import {KindeProvider} from "@kinde-oss/kinde-auth-react";

function MainPage() {
  return (
    <KindeProvider
		clientId="7e3d01f114b84ee7b850ed3c0d5ac2e7"
		domain="https://profofdarkarts.kinde.com"
		redirectUri="http://15.206.92.19:3000"
		logoutUri="http://15.206.92.19:3000"
	>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/birthdetails" element={<Birthdetails />} />
      </Routes>
    </Router>
    </KindeProvider>
  );
}

export default MainPage;
