import { useState } from 'react'
import './index.css'
import './App.css'
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoutesApp from './routes/RouteApp';
import ProtectedRoutes from "./routes/ProtectRoutes";
import Error404 from './components/Error404';
import HomeScreen from './pages/HomeScreen';
import SurveyScreen from './pages/SurveyScreen';
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import FinalAdmin from './components/FinalAdmin';


function App() {
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
  
    const saveUser = (data) => {
      setUser(data);
    };
  
    const loginUser = () => {
      setLogin(true);
    };
  
    const logoutUser = () => {
      setLogin(false);
      localStorage.removeItem("token")
    };
    return (
      <BrowserRouter>
        <Navbar login={login} />
        <Routes>
          <Route path="/*" element={
              <ProtectedRoutes login={login}>
                {/* <RoutesApp logoutUser={logoutUser} user={user} /> */}
                
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login loginUser={loginUser} saveUser={saveUser}/>}/>
          <Route path="/admin" element={<FinalAdmin/>} />
          <Route path="/" element={<HomeScreen/>} />
          <Route path="/survey/:surveyID" element={<SurveyScreen />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    );     
} 
export default App
