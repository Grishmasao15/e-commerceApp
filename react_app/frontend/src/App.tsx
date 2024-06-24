// import React, { useState, useEffect } from 'react';
import "./App.css";
// import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { RegenerateLink } from "./components/ActivationPage/activatedPage";
import { LoginPage } from "./components/Login/login";
import { Activation } from "./components/ActivationPage/activationPage";
import { Register } from "./components/Register/register";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Table from "./components/Tutorial-Details/table";
import AddDetails from "./components/StudentForm/addtutorialform";
import { Home } from "./components/home";
import { Forgotpassword } from "./components/Login/forgotpass";
// import { ResetPasswordForm } from "./components/Login/resetPass";
import { ResetPassForm } from "./components/Login/resetPass";
import { Contact } from "./components/MultistepForm/steps/basicDetails";
import { Education } from "./components/MultistepForm/steps/educationDetails";
import { Confirm } from "./components/MultistepForm/steps/confirm";
import { Stepper } from "./components/MultistepForm/steps/stepper";
import { WorkExperience } from "./components/MultistepForm/steps/workExperience";
import { LangKnown } from "./components/MultistepForm/steps/languageKnown";
import { TechKnown } from "./components/MultistepForm/steps/technologyKnown";
import { Preferences } from "./components/MultistepForm/steps/preferences";
import { ReferenceContact } from "./components/MultistepForm/steps/referenceContact";
import { MultistepFormTable } from "./components/Multistep-FormDetails/multistepFormDetails";
import { IdDetails } from "./components/Multistep-FormDetails/idDetails";
import { AppProvider } from "./components/MultistepForm/state";
import { Homee } from "./components/ECommerce/homee";
import Navbar from "./components/ECommerce/navbar";
import { Cart } from "./components/ECommerce/cart";
import Wishlist from "./components/ECommerce/Wishlist";
import { ProtectedRoute } from "./components/Login/protectedRoute";
import { AuthProvider } from "./components/Login/useAuth";
import { Order } from "./components/ECommerce/orderDetails";
import { PlacedOrder } from "./components/ECommerce/placedOrder";

function App() {



  return (
    <div className="App">
      <AppProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Homee />} />
              {/* <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} /> */}
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/orderdetails" element={<ProtectedRoute><Order /></ProtectedRoute>} />
              <Route path="/placed-order" element={<ProtectedRoute><PlacedOrder /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/activation" element={<Activation />} />
              <Route path="/regenerate-link" element={<RegenerateLink />} />
              <Route path="/student-details" element={<Table />} />
              <Route path="/student-form" element={<AddDetails />} />
              <Route path="/home" element={<Home />} />
              <Route path="/forgot-password" element={<Forgotpassword />} />
              <Route path="/forgot-password/reset-password" element={<ResetPassForm />} />
              <Route path="/multistep-form" element={<Contact />} />
              <Route path="/education" element={<Education />} />
              <Route path="/work-exp" element={<WorkExperience />} />
              <Route path="/lang-known" element={<LangKnown />} />
              <Route path="/tech-known" element={<TechKnown />} />
              <Route path="/ref-contact" element={<ReferenceContact />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/confirm" element={<Confirm />} />
              <Route path="/multistep-formdetails" element={<MultistepFormTable />} />
              <Route path="/view-details" element={<IdDetails />} />

            </Routes>
          </AuthProvider>
        </Router>
      </AppProvider>
    </div>
  );
}

export default App




