import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid, Column, Image, Header, Segment, Icon, Comment, Form, Item, Avatar } from 'semantic-ui-react';
import './css/Posts.css';

import firebase from '../utils/firebase';

import { LuHeart, LuMessageCircle } from "react-icons/lu";

function Posts() {
    
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        firebase
          .firestore()
          .collection('posts')
          .get()
          .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(docSnapshot => {
              const id = docSnapshot.id;
              return { ...docSnapshot.data(), id };
            })
            setPosts(data);
          })
      }, []);
    /*
      function toggle(isActive, field) {
        const uid = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection('posts')
          .doc(postId)
          .update({
            [field]: isActive
              ? firebase.firestore.FieldValue.arrayRemove(uid)
              : firebase.firestore.FieldValue.arrayUnion(uid),
          });
      }
      */
    return (
      <div className='posts-container'>
        {posts.map((post) => {
          return (
            <div className='posts' key={post.id} as={Link} to={`/posts/${post.id}`}>
              <div className='user-info-posts'>
                <div className='user-photo-posts'>
                  {post.author.photoURL ? (
                    <img  src={post.author.photoURL}  circular/>
                  ) : ( <img src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' circular/>)}
                </div>
                <div className='user-name-posts'>{post.author.displayName || 'Anonymous'}</div>
              </div>
              <div className='posts-content'>{post.content}</div>
              {post.imageUrl && <img className='posts-img' src={post.imageUrl} />}
              <div className='posts-interactive'>
                <span className='posts-interactive-btn'><LuHeart /></span>
                <span className='posts-interactive-btn'><LuMessageCircle /></span>
              </div>
              <div className='posts-border' />
            </div>
          );
        })}
      </div>
    );
}

export default Posts;