import { AppProvider } from './state';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const JobApplicationForm = () => {
  return (
    <div>
      <AppProvider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/activation" element={<Activation />} />
          <Route path="/regenerate-link" element={<RegenerateLink />} />
          <Route path="/student-details" element={<Table />} />
          <Route path="/student-form" element={<AddDetails />} /> */}

          </Routes>
        </Router>
      </AppProvider>
    </div>
  )
}