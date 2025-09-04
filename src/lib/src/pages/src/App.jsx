// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={
          <RequireAuth><Dashboard/></RequireAuth>
        } />
        <Route path="*" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
