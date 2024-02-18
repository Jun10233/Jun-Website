import { Menu, Search } from 'semantic-ui-react';
import { Link, useHistory, useNavigate } from 'react-router-dom';
import React, {Component} from 'react';
import './pages/css/Header.css';

import firebase from './utils/firebase';
import Logo from './img/logo.png';
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoHome, GoSignIn, GoSignOut, GoPerson, GoDownload } from "react-icons/go";

function Header(){
    const negative = useNavigate();
    const [user, setUser] = React.useState(null);
    /*
    const [inputValue, setInputValue] = React.useState('');
    /*
    const [results, setResults] = React.useState([]);
    */
    React.useEffect(()=>{
      firebase.auth().onAuthStateChanged((currentUser)=>{
        setUser(currentUser);
      });
    },[]);
    /*
    function onSearchChange(e, { value }) {
      setInputValue(value);
  
      algolia.search(value).then((result) => {
        const searchResults = result.hits.map((hit) => {
          return {
            title: hit.title,
            description: hit.content,
            id: hit.objectID,
          };
        });
        setResults(searchResults);
      });
    }
  
    function onResultSelect(e, { result }) {
      negative(`/posts/${result.id}`);
    }
    */
    
    return(
      <header>
      <div className='menu'>
        <div className='menu-item'>
          <Link to='/'>
            <img src={Logo} alt="Logo" className='logo'/*style={{ width: '50px', height: '50px' }}*/ />
          </Link>
        </div>
        {user ? (
          <>
          <div className='menu-item'>
            <Link to='/posts'><span className='icon'><GoHome /></span></Link>
          </div>

          <div className='menu-item'>
            <Link to='/newpost'><span className='icon'><IoIosAddCircleOutline /></span></Link>
          </div>
          <div className='menu-item'>
            <Link to='/my/posts'><span className='icon'><GoPerson /></span></Link>
          </div>
          <div className='menu-item'>
            <Link to='/resource'><span className='icon'><GoDownload /></span></Link>
          </div>
          <div className='menu-item' onClick={() => firebase.auth().signOut()}>
            <Link to='/'><span className='icon'><GoSignOut /></span></Link>
          </div>
            </>
        ) : (
          <div className='menu-item'>
            <Link to='/signin'><span className='icon'><GoSignIn /></span></Link>
          </div>
        )}
      </div>
      </header>
      /*
      <Menu className='menu'>
        <Menu.Item as={Link} to="/">
          <img src={Logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
        </Menu.Item>
        {user ? (
          <>
          <Menu.Item as={Link} to="/posts">Home</Menu.Item>
          <Menu.Menu position="right">
              <Menu.Item as={Link} to="/new-post">
                發布貼文
              </Menu.Item>
              <Menu.Item as={Link} to="/my/posts">
                會員
              </Menu.Item>
              <Menu.Item onClick={() => firebase.auth().signOut()} as={Link} to="/">
                登出
              </Menu.Item>
            
          </Menu.Menu>
            </>
        ) : (
          <Menu.Menu position="right">
            <Menu.Item as={Link} to="/signin">
              登入
            </Menu.Item>
          </Menu.Menu>
        )}
      </Menu>
      */
    );
}
export default Header;