import React, { useRef } from "react";

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import Signup from './components/SignUp';

import Login from './components/Login';

import Homepage from './components/Homepage';

import ForgotPassword from './components/ForgotPassword';

import LoadingBar from "react-top-loading-bar";




function App() {

  const ref = useRef(null); // Create a reference for the loading bar
  return (
    <Router>

    < LoadingBar color="#f11946" ref={ref} height={3} /> {/* Add the loading bar */}

          

      <Routes>

        <Route path = "/" element = {<Login startLoading = {() => ref.current.continoussStart()} stopLoading={() => ref.current.complete()}  />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/homepage" element = {<Homepage />} />

        <Route path = "/forgotpassword" element = {<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
