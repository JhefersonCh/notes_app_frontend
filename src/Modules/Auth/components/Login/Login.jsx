/* eslint-disable react/prop-types */
import { RiLockPasswordLine } from 'react-icons/ri';
import './Login.css'
import { MdAlternateEmail } from "react-icons/md";
import { FormContainer } from '../../../shared/components/form-container/FormContainer';
import { useContext, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import authService from '../../../shared/services/authService';
import tokenService from '../../../shared/services/tokenService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/authContext';

export const Login = ({ setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmai] = useState('');
  const [password, setPassword] = useState('');

  const { setAuthentication, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const showRegister = () => {
    setShowRegister(true)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email || !password) return toast.error('All fields are required.')
    
    const user = {
      email,
      password
    }

    try {
      const { data } = await authService.login(user);
      const userLogged = data?.data?.user;
      tokenService.setUser(userLogged);
      setAuthentication(userLogged)
      console.log(user);
      return navigate("/")
    } catch (error) {
      return;
    }
    
  }

  return (
    <div>
      <FormContainer>
        <h1 className='text-center fw-bold title'>Sign in</h1>
        <form className='d-flex flex-column gap-2'>
          <div className="form-field-login">
            <label htmlFor="email" className='input-label'>Email</label>
            <div className='d-flex align-items-center'>
              <MdAlternateEmail className='field-icon' />
              <input
                type="text"
                id="email"
                className='w-100 input-with-icon'
                value={email}
                onChange={(e) => setEmai(e.target.value)} />
            </div>
          </div>
          <div className="form-field-login">
            <label htmlFor="password" className='input-label'>Password</label>
            <div className='d-flex align-items-center password'>
              <RiLockPasswordLine className='field-icon' />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className='w-100 input-with-icon'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {
                !showPassword
                  ? <IoEyeOutline className='field-icon-sufix' onClick={() => setShowPassword(true)} />
                  : <IoEyeOffOutline className='field-icon-sufix' onClick={() => setShowPassword(false)} />
              }
            </div>
          </div>
          <div className='mt-2'>
            <button type="button" onClick={handleLogin} className='w-100 basic-button'>Login</button>
          </div>
          <div className='text-center'>
            <p>{"Don't have an account?"} <a onClick={showRegister} style={{ color: "red", cursor: "pointer" }} className='nav-underline'>Register</a></p>
          </div>
        </form>
      </FormContainer>
    </div>
  )
}