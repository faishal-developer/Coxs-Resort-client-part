import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCPV-hRCid46fcych9nbCZ19NM4P9q-jgs",
  authDomain: "coxs-resort-tourism-web.firebaseapp.com",
  projectId: "coxs-resort-tourism-web",
  storageBucket: "coxs-resort-tourism-web.appspot.com",
  messagingSenderId: "78455762896",
  appId: "1:78455762896:web:aac3bdb512bfe4bfae53d5"
};

const app=()=>{
    initializeApp(firebaseConfig)
}
export default app