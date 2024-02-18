import React from "react";
import firebase from "../utils/firebase";
import './css/Home.css'
import Img from '../img/profile.jpeg';

function Home(){
    const [links, setLinks] =React.useState([]);
    const [profile, setProfile] =React.useState([]);

    React.useEffect(() => {
        firebase
            .firestore()
            .collection('links')
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(doc => {
                    return doc.data();
                });
                setLinks(data);
            });
    },[]);
    React.useEffect(() => {
        firebase
            .firestore()
            .collection('profile')
            .get()
            .then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(doc => {
                    return doc.data();
                });
                setProfile(data);
            });
    },[]);
    

    return(
        <div className="container-wrapper">
        <div className="container">
            <div>
                {profile.map((profile, index) => (<img src={profile.url} className="image" />))}
            </div>

            <h1 className="topic">Jun</h1>
            <p className="bio">𝗗𝗼𝗻'𝘁 𝗰𝗵𝗼𝗼𝘀𝗲 𝘁𝗼 𝗯𝗲 𝗮𝘁 𝗲𝗮𝘀𝗲 𝘄𝗵𝗲𝗻 𝗶𝘁'𝘀 𝘁𝗵𝗲 𝘁𝗶𝗺𝗲 𝘁𝗼 𝘀𝘁𝗿𝘂𝗴𝗴𝗹𝗲 𝗺𝗼𝘀𝘁.</p>
            <ul className="url">
                {links.map((links, index) => (
                    <li className="link" key={index}>
                        <a className="a" href={links.url} target="_blank" rel="noopener noreferrer">
                            {links.title}
                        </a>
                    </li>
                ))}
                
            </ul>
        </div>
        </div>
    );

}

export default Home;