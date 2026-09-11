import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Splash from './pages/Splash';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Splash />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
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