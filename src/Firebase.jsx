// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth , GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import { getStorage} from "firebase/storage"





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmN76CQdULARvK6qm8NG1v9BjAN_xbn7A",
  authDomain: "todolist-20016.firebaseapp.com",
  projectId: "todolist-20016",
  storageBucket: "todolist-20016.appspot.com",
  messagingSenderId: "361706389513",
  appId: "1:361706389513:web:c84c23eb5d3365bcadb8d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()
export const gitProvider = new GithubAuthProvider()

export const db = getFirestore(app)

export const imageDb = getStorage(app)