// Import statements...
import React, { useState, useEffect, useRef } from 'react';
import "../App.css"
import Tab from '../components/Tab'
import Loginform from '../components/Loginform'
import Signupform from '../components/Signupform'
import { ref, getDownloadURL } from 'firebase/storage';
import { imageDb } from '../Firebase';
import { getDoc, setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';



import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { db, auth} from '../Firebase';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation-1710175289637.json';
import animationData2 from "../assets/Animation-1710182500493.json"

function Login() {
  const [githubIconUrl, setGithubIconUrl] = useState('');

  const tabNames =["Login" , "Signup"]
  const [activeTab, setActiveTab] = useState("Login");

  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login')

  const [userCredentials, setUserCredentials] = useState({})
  const navigate = useNavigate();

  const space = 'space-x-10'


  useEffect(() => {
    const githubIconRef = ref(imageDb, 'files/icons8-github-50.png'); 
    getDownloadURL(githubIconRef)
      .then((url) => setGithubIconUrl(url));
  }, []);
  


  const handleSocial = async (authProvider) => {
    try {
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;
  
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(userQuery);
  
      if (querySnapshot.empty) {
        // User document doesn't exist, create it
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: user.displayName,
          taskCompleted: 0,
          taskToComplete: 0,
          missedTask: 0
        });
      }
  
      navigate("/ToDoPage");
    } catch (error) {
      console.error('Social Sign-In Error:', error);
    }
  };
  

  function handleCredentials(e) {
    setUserCredentials({...userCredentials, [e.target.name] : e.target.value});
    console.log(userCredentials);
  } 

  

  function handleSignUp(e) {
    e.preventDefault();
  
    if (userCredentials.password !== userCredentials.confirmPassword) {
      alert("Password does not match");
      return;
    }
  
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
  
        // Update the user profile with the provided name
        await updateProfile(user, { displayName: userCredentials.name });
  
        // Save additional user information to Firestore
        const userData = {
          email: userCredentials.email,
          name: userCredentials.name,
          taskCompleted: 0,
          taskToComplete: 0,
          missedTask: 0
        };
  
        // Set the document in the 'users' collection with the user's UID
        await setDoc(doc(db, 'users', user.uid), userData);
  
    
        navigate("/ToDoPage");
        
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Password should be at least 8 characters long");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email already taken, please use a different email or login");
        } else if (error.code === "auth/invalid-email") {
          alert("Invalid email address, please try again.")
        } else {
          alert(error.message);
        }
      });
  }
  
  function handleLogIn(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/ToDoPage");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("Invalid email, please try again!");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong password, please try again!");
        } 
        else {
          alert(error.message);
        }
      });
  }

  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-[700px] mt-1 flex flex-col justify-center items-center relative">
        <div className="text-white text-lg flex flex-col justify-center items-center">
          <Tab tabNames={tabNames} activeTab={activeTab} setActiveTab={setActiveTab} space={space} />
          {activeTab === "Login" && <Loginform handleCredentials={handleCredentials} handleLogIn={handleLogIn} handleSocial={handleSocial} gitIcon = {githubIconUrl} />}
          {activeTab === "Signup" && <Signupform handleCredentials={handleCredentials} handleSignUp={handleSignUp} handleSocial= {handleSocial} gitIcon={githubIconUrl}/>}
        </div>
      </div>
      {/* Container for everything on the right */}
      <div className="flex flex-col items-center bg-blue-500 p-4 relative opacity-85">
        {/* Container for Animation 2 (Top right) */}
        <div className="absolute top-0 right-0 mt-4">
          <div className="h-[200px] w-[200px]">
            <Lottie animationData={animationData2} autoplay={true} />
          </div>
        </div>
        {/* Container for Animation 1 and Text (Center) */}
        <div className="flex items-center mt-44">
          <div className="w-2/3">
            <Lottie animationData={animationData} autoplay={true} />
          </div>
          <div className="text-white text-3xl font-bold mb-2">Reach and track your goals. All in one app.</div>
        </div>
      </div>
      
    </div>
  );
}

export default Login;
