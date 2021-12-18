import { useState } from 'react'
import app from '../firebase/firebase.initialize';
import swal from 'sweetalert'
import { updateProfile, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


app();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

const useFirebase = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const loginWithGoogle = (history, pathname) => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user)
        setIsLoading(false)
        swal({
          title: "Good job!",
          text: "Logged In Successfully",
          icon: "success",
        });
        history.push(pathname)
      })
      .catch(e => {
        setIsLoading(false)
        swal({
          title: "Error",
          text: e.message,
          icon: "error",
        });
      })
  }
  const passwordRegistration = (email, password, name, history) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        setUser(result.user);
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          setIsLoading(false)
        }).catch((error) => {
          setIsLoading(false)
        });
        swal({
          title: "Good job!",
          text: "Registration successfull",
          icon: "success",
        });
        history.push('/home')
      })
      .catch(e => {
        setIsLoading(false)
        swal({
          title: "Error!",
          text: e.message,
          icon: "error",
        });
      })
  }

  const loginWithPassword = (email, password, history, path) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        setUser(res.user)
        setIsLoading(false)
        swal({
          title: "Good job!",
          text: "logged In successfully",
          icon: "success",
        });
        history.push(path)
      })
      .catch(e => {
        setIsLoading(false)
        swal({
          title: "Error!",
          text: e.message,
          icon: "error",
        });
      })
  }


  const logOut = () => {
    signOut(auth).then(() => {
      setUser({})
      swal({
        title: "Good job!",
        text: "Signed out successfully",
        icon: "success",
      });
    }).catch((e) => {
      swal({
        title: "Error!",
        text: e.message,
        icon: "error",
      });
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  });

  return {
    loginWithGoogle,
    user,
    passwordRegistration,
    loginWithPassword,
    logOut,
    isLoading
  }
}
export default useFirebase