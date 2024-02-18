import React from 'react';
import { Message } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import firebase from '../utils/firebase';
import './css/Register.css';

import { IoIosMail } from "react-icons/io";
import { BsPersonFill, BsFillLockFill } from "react-icons/bs";

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] =React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/posts');
        setIsLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('信箱已存在');
            break;
          case 'auth/invalid-email':
            setErrorMessage('信箱格式不正確');
            break;
          case 'auth/weak-password':
            setErrorMessage('密碼強度不足');
            break;
          default:
            setErrorMessage('註冊失敗');
        }
        setIsLoading(false);
      });
  };

  return (
    <div className='wrapper'>
      <div className="register-wrapper">
        <div className='form-box register'>
        <h2>註冊</h2>
          <form onSubmit={handleSubmit}>
            
            <div className='input-box'>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                /*placeholder="請輸入使用者名稱"*/
              />
              <label>Username</label>
              <span className='icon'><BsPersonFill /></span>
            </div>
            
            <div className='input-box'>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /*placeholder="請輸入信箱"*/
              />
              <label>Mail</label>
              <span className='icon'><IoIosMail /></span>
            </div>
            <div className='input-box'>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /*placeholder="請輸入密碼"*/
                type="password"
              />
              <label>Password</label>
              <span className='icon'><BsFillLockFill /></span>
            </div>
            <button className="btn" loading={isLoading}>
              註冊
            </button>
            <p className='signin-register'>
              已經有帳號？ <Link to="/signin" className='singinin-link'>登入</Link>
            </p>
            {errorMessage && <Message className="message" negative>{errorMessage}</Message>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;