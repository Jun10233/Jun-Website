import { Container, Header, Form, Image, Button } from 'semantic-ui-react';
import React from 'react';
import 'firebase/firestore';
import 'firebase/compat/storage';
import { useNavigate} from 'react-router-dom';
import 'firebase/compat/auth';
import './css/NewPost.css'

import firebase from '../utils/firebase';

function NewPost() {
  const navigate = useNavigate();
  const [content, setContent] = React.useState('');
  const [file, setFile] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const previewUrl = file
    ? URL.createObjectURL(file)
    : null;
    
  function onSubmit() {
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
              navigate('/');
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
          navigate('/');
        })
        .catch((error) => {
          console.error('Error setting document: ', error);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className='wrapper'>
      <Header as='h2' className='header'>
        發表文章
      </Header>
      <Form onSubmit={onSubmit}>
        {previewUrl && <Image className='img' src={previewUrl} size="small" floated="left" />}
        <Button basic as="label" htmlFor="post-image">
          上傳文章圖片
        </Button>
        <input
          type="file"
          id="post-image"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <textarea
          placeholder="輸入文章內容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button loading={isLoading} type='submit'>送出</Button>
      </Form>
    </div>

  );
}

export default NewPost;