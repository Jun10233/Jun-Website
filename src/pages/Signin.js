import React from 'react';
import { Message } from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import 'firebase/compat/auth';
import firebase from '../utils/firebase';
import './css/Signin.css';

import { IoIosMail } from "react-icons/io";
import { BsFillLockFill } from "react-icons/bs";

function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigate('/posts');
        setIsLoading(false);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMessage('信箱格式不正確');
            break;
          case 'auth/user-not-found':
            setErrorMessage('信箱不存在');
            break;
          case 'auth/wrong-password':
            setErrorMessage('密碼錯誤');
            break;
          default:
            setErrorMessage('登入失敗');
        }
        setIsLoading(false);
      });
  };

  return (
    <div className='wrapper'>
      <div className="signin-wrapper">
        <div className='form-box signin'>
        <h2>登入</h2>
          <form onSubmit={handleSubmit}>
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
              登入
            </button>
            <p className='signin-register'>
              沒有帳號？ <Link to="/register" className='register-link'>註冊</Link>
            </p>
            {errorMessage && <Message className="message" negative>{errorMessage}</Message>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;