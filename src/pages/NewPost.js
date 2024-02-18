import { Container, Header, Form, Image, Button, Icon } from 'semantic-ui-react';
import React from 'react';
import 'firebase/firestore';
import 'firebase/compat/storage';
import { useNavigate} from 'react-router-dom';
import 'firebase/compat/auth';
import './css/NewPost.css'

import firebase from '../utils/firebase';
import { TbPhotoSquareRounded } from "react-icons/tb";

function NewPost() {
  const navigate = useNavigate();
  const [content, setContent] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const previewUrl = file
    ? URL.createObjectURL(file)
    : null;
    
  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    const documentRef = firebase.firestore().collection('posts').doc();
    
    let imageUrl = ''; 

    if (file) {
      const fileRef = firebase.storage().ref(`post-images/${documentRef.id}`);
      const metadata = { contentType: file.type };

      fileRef.put( file, metadata).then(() => {
        fileRef.getDownloadURL().then((url) => {
          imageUrl = url;

          documentRef
            .set({
              content,
              createdAt: firebase.firestore.Timestamp.now(),
              author: {
                displayName: firebase.auth().currentUser.displayName || '',
                photoURL: firebase.auth().currentUser.photoURL || '',
                uid: firebase.auth().currentUser.uid,
                email: firebase.auth().currentUser.email,
              },
              imageUrl,
            })
            .then(() => {
              setIsLoading(false);
              navigate('/posts');
            })
            .catch((error) => {
              console.error('Error setting document: ', error);
              setIsLoading(false);
            });
        });
      });
    } else {
      documentRef
        .set({
          content,
          createdAt: firebase.firestore.Timestamp.now(),
          author: {
            displayName: firebase.auth().currentUser.displayName || '',
            photoURL: firebase.auth().currentUser.photoURL || '',
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email,
          },
          imageUrl,
        })
        .then(() => {
          setIsLoading(false);
          navigate('/posts');
        })
        .catch((error) => {
          console.error('Error setting document: ', error);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className={`wrapper ${file ? 'image-selected' : 'null'}`}>
      
      <form className='form' onSubmit={(event) => onSubmit(event)}>
        <div className='user-info'>
          <img className='user-photo' src={/*user.photoURL ||*/ 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'} circular />
          <div className='user-name'>{/*user.displayName ||*/ 'Anonymous'}</div>
        </div>
        {previewUrl && <Image className='img' src={previewUrl} size="small" floated="left" />}
        <div className='post-input-box'>
          <input
            placeholder="輸入文章內容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className='btn-container'>
        <label htmlFor="post-image" style={{ cursor: 'pointer' }}>
          <span className='upload-img-btn'><TbPhotoSquareRounded /></span>
        </label>
        <input
          type="file"
          id="post-image"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className='post-btn' loading={isLoading} type='submit'>Post</button>
        </div>
      </form>
    </div>

  );
}

export default NewPost;