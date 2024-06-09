/* eslint-disable react/prop-types */
import { RiLockPasswordLine } from 'react-icons/ri';
import './Register.css';
import { MdAlternateEmail, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FormContainer } from '../../../shared/components/form-container/FormContainer';
import { FaRegUser } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { useState } from 'react';
import { toast } from 'react-toastify';
import userService from '../../../shared/services/userService';

export const Register = ({ setShowRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [disableButton, setDisableButton] = useState(false)

  const showlogin = () => {
    setShowRegister(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if(!password || !confirmPassword || !fullName || !username || !email) return toast.error('All fields are required.')
    if(password !== confirmPassword) return toast.error("The passwords don't match.")
    if(password.length < 10) return toast.error("The password is very short.")
  
    const user = {
      fullName,
      username,
      email,
      password
    } 

    try {
      setDisableButton(true);
      await userService.createUser(user);
      setDisableButton(false);
      setShowRegister(false);
    } catch (error) {
      return setDisableButton(false);
    }

  };

  return (
    <div>
      <FormContainer>
        <h1 className='text-center fw-bold title'>Register</h1>

        <form className='d-flex flex-column' onSubmit={handleRegister}>
          <div className="form-field">
            <label htmlFor="fullName" className='input-label'>Full name</label>
            <div className='d-flex align-items-center'>
              <FaRegUser className='field-icon' />
              <input 
                type="text" 
                id="fullName" 
                className='w-100 input-with-icon' 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="username" className='input-label'>Username</label>
            <div className='d-flex align-items-center'>
              <MdOutlineDriveFileRenameOutline className='field-icon' />
              <input 
                type="text" 
                id="username" 
                className='w-100 input-with-icon' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="email" className='input-label'>Email</label>
            <div className='d-flex align-items-center'>
              <MdAlternateEmail className='field-icon' />
              <input 
                type="email" 
                id="email" 
                className='w-100 input-with-icon' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="password" className='input-label'>Password</label>
            <div className='d-flex align-items-center password'>
              <RiLockPasswordLine className='field-icon' />
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className='w-100 input-with-icon' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              {
                !showPassword
                  ? <IoEyeOutline className='field-icon-sufix' onClick={() => setShowPassword(true)} />
                  : <IoEyeOffOutline className='field-icon-sufix' onClick={() => setShowPassword(false)} />
              }
            </div>

            <p className='p-0 m-0 field-error'>{password.length < 10 && password ? "Min 10 characters." : ''}</p>

          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword" className='input-label'>Confirm password</label>
            <div className='d-flex align-items-center password'>
              <RiLockPasswordLine className='field-icon-prefix' />
              <input 
                type={showPasswordConfirm ? "text" : "password"} 
                id="confirmPassword" 
                className='w-100 input-with-icon' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
              />
              {
                !showPasswordConfirm
                  ? <IoEyeOutline className='field-icon-sufix' onClick={() => setShowPasswordConfirm(true)} />
                  : <IoEyeOffOutline className='field-icon-sufix' onClick={() => setShowPasswordConfirm(false)} />
              }
            </div>
            
            <p className='p-0 m-0 field-error'>{password && confirmPassword && password !== confirmPassword ? "Passwords do not match" : ''}</p>

          </div>

          <div className='mt-2'>
            <button disabled={disableButton} type="button" className='w-100 basic-button' onClick={handleRegister}>Complete Register</button>
          </div>

          <div className='text-center'>
            <p>{"Do you have an account? "} <a onClick={showlogin} style={{ color: "blue", cursor: "pointer" }} className='nav-underline'>Sign in</a></p>
          </div>
        </form>
      </FormContainer>
    </div>
  );
}
