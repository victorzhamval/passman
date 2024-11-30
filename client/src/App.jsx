import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import {
  Route,
  Routes,
  useNavigate,
  useResolvedPath
} from 'react-router-dom';

import {
  Home,
  Account,
  PasswordGenerator,
  PasswordEncryption,
  CreateAccount,
  Login,
} from './pages';

import { navigate } from './globals/refs';
import { Sidebar } from './components';
import UsersAPI from './api/UsersAPI';
import AuthUtils from './globals/Auth';

function App() {
  const [loading, setLoading] = useState(true);

  const path = useResolvedPath();
  navigate.current = useNavigate();

  const authenticate = async () => {
    if (path.pathname === '/login' || path.pathname === '/create-account') {
      AuthUtils.deleteToken();
      return;
    }

    if (!AuthUtils.token) {
      navigate.current('/login');
      return;
    }

    const isTokenValid = await UsersAPI.verifyToken();
    if (!isTokenValid.ok) {
      AuthUtils.deleteToken();
      navigate.current('/login');
    }
  }

  useEffect(() => {
    authenticate().then(() => setLoading(false));
  }, []);

  return (
    <>
      <Toaster />
      {!loading && <AppContent path={path} />}
    </>
  );
}

const AppContent = ({ path }) => {

  return (
    <div className="App">
      {path.pathname !== "/login" && path.pathname !== "/create-account" && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/account' element={<Account />} />
        {/* <Route path='/settings' element={<Settings/>}/> */}
        <Route path="password-generator" element={<PasswordGenerator />} />
        {/*<Route path="password-security" element={<PasswordSecurity/>}/>*/}
        <Route path="password-encryption" element={<PasswordEncryption />} />
        <Route path="/login" element={<Login />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="*" element={<h1>404 - NOT FOUND</h1>} />
      </Routes>
    </div>
  );
}

export default App;
