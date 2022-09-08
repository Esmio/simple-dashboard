import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Display from './pages/Display';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/chart/add" element={<Home />} />
          <Route path="chart/display" element={<Display />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
