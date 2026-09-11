import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Splash from './pages/Splash';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Splash />} />

        <Route
          path="/register"
          element={<h1>Register Page</h1>}
        />

        <Route
          path="/login"
          element={<h1>Login Page</h1>}
        />

        <Route
          path="/dashboard"
          element={<h1>Dashboard</h1>}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;