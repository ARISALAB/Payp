// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";

// Firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyAlFCOK49HAzisru-KTTF0ZqP_mtmEyt6Y",
  authDomain: "speedy-bazaar-411110.firebaseapp.com",
  projectId: "speedy-bazaar-411110",
  storageBucket: "speedy-bazaar-411110.appspot.com",
  messagingSenderId: "752456596300",
  appId: "1:752456596300:web:f920df7be01ba63d66ede9",
  measurementId: "G-NGZHWDY6S5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// UI Elements
const googleLoginBtn = document.getElementById('google-login');
const emailLoginBtn = document.getElementById('email-login');
const emailForm = document.getElementById('email-form');
const emailLoginSubmit = document.getElementById('email-login-submit');
const registerSubmit = document.getElementById('register-submit');
const userInfo = document.getElementById('user-info');
const userName = document.getElementById('user-name');
const userPhoto = document.getElementById('user-photo');

// Handle Google Login
googleLoginBtn.addEventListener('click', () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            console.log('User signed in: ', user);
            displayUserInfo(user);
        }).catch((error) => {
            console.error(error.message);
        });
});

// Handle Email Login form visibility
emailLoginBtn.addEventListener('click', () => {
    emailForm.style.display = 'block';
});

// Handle Email Sign-In
emailLoginSubmit.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User signed in: ', user);
            displayUserInfo(user);
        }).catch((error) => {
            console.error(error.message);
        });
});

// Handle Registration
registerSubmit.addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('User registered: ', user);
            displayUserInfo(user);
        }).catch((error) => {
            console.error(error.message);
        });
});

// Display User Info after Login
function displayUserInfo(user) {
    userName.innerText = user.displayName || user.email;
    userPhoto.src = user.photoURL || 'default-avatar.png'; // Fallback photo
    userInfo.style.display = 'block';
    emailForm.style.display = 'none';
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayUserInfo(user);
    }
});
