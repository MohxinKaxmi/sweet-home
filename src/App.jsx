import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/profile';

export default function App() {
  return 
  <BrowserRouter>
  <Routes>
    
    <Route path="/Home" element={<Home />} />
    <Route path="/Sign-in" element={<SignIn />} />
    <Route path="/Sign-up" element={<SignUp />} />
    <Route path="/about" element={<About />} />
    <Route path="/about" element={<Profile />} />
    

  </Routes>
  </BrowserRouter>
}
