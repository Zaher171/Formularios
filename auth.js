import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_qIcedJJ5yKeLmdI0tuqs_3RlgAZFcak",
  authDomain: "formularios-1ada6.firebaseapp.com",
  projectId: "formularios-1ada6",
  storageBucket: "formularios-1ada6.firebasestorage.app",
  messagingSenderId: "188607647372",
  appId: "1:188607647372:web:958c8ee307470219c4f5a9",
  measurementId: "G-CZXKP5F6KT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// MOSTRAR CONTRASEÑA
window.togglePass = (id) => {
  const el = document.getElementById(id);
  if (el) el.type = el.type === "password" ? "text" : "password";
};

// REGISTRO
const regForm = document.getElementById('register-form');
if (regForm) {
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const p1 = document.getElementById('reg-pass1').value;
    const p2 = document.getElementById('reg-pass2').value;
    if (p1 !== p2) return alert("Las contraseñas no coinciden");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, p1);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        nombre: document.getElementById('reg-name').value,
        direccion: document.getElementById('reg-address').value,
        nacimiento: document.getElementById('reg-year').value,
        fechaRegistro: serverTimestamp()
      });
      alert("¡Registro completado con éxito!");
      window.location.href = "login.html";
    } catch (error) { alert("Error al registrar: " + error.message); }
  });
}

// LOGIN
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-pass').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);
      await setDoc(doc(db, "logins", userCredential.user.uid), {
        ultimoAcceso: serverTimestamp(),
        email: email
      }, { merge: true });
      alert("Has iniciado sesión correctamente");
      window.location.href = "index.html";
    } catch (error) { alert("Error de acceso: Credenciales incorrectas"); }
  });
}
