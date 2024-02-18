import React from 'react';
import { List } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import 'firebase/firestore';

import firebase from '../utils/firebase';

function Topics() {
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const currentTopic = urlSearchParams.get('topic');
  const [topics, setTopcis] = React.useState([]);
  React.useEffect(() => {
    firebase
      .firestore()
      .collection('topics')
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data();
        });
        setTopcis(data);
      });
  }, []);
}