import {useState} from 'react'
import app from '../firebase/firebase.initialize';
import {updateProfile ,signOut,onAuthStateChanged ,signInWithEmailAndPassword ,createUserWithEmailAndPassword ,getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


app();
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();

const useFirebase=()=>{
    const [user,setUser] = useState({})
    const [isLoading,setIsLoading]=useState(true)

    const loginWithGoogle=()=>{
        signInWithPopup(auth, googleProvider)
          .then((result) => {
            setUser(result.user)
            setIsLoading(false)
            alert('logged in successfull')
          })
          .catch(e=>{
            setIsLoading(false)
            alert(e.message)
          })
    }
    const passwordRegistration=(email,password,name)=>{
        createUserWithEmailAndPassword(auth,email,password)
            .then(result=>{
                setUser(result.user);
                updateProfile(auth.currentUser, {
                    displayName: name
                  }).then(() => {
                    setIsLoading(false)
                  }).catch((error) => {
                    setIsLoading(false)
                  });
                alert('registration successfull')
            })
            .catch(e=>{
              setIsLoading(false)
              alert(e.message)
            })
    }

    const loginWithPassword=(email,password)=>{
        signInWithEmailAndPassword(auth, email, password)
            .then(res=>{
                setUser(res.user)
                setIsLoading(false)
                alert('logged in successfull')
            })
            .catch(e=>{
              setIsLoading(false)
              alert(e.message)
            })
    }

    
    const logOut=()=>{
        signOut(auth).then(() => {
            setUser({})
            alert('successfully logout')
          }).catch((error) => {
            alert(e=>e.message)
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