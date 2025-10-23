import React, { useState } from 'react';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  container: {
    maxWidth: '350px',
    margin: '60px auto',
    padding: '32px 24px',
    borderRadius: '12px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
    background: '#fff',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '24px',
    color: '#333',
    fontWeight: 600,
    fontSize: '1.7rem',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border 0.2s',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#4f8cff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '16px',
    transition: 'background 0.2s',
  },
  buttonHover: {
    background: '#2563eb',
  },
  link: {
    color: '#4f8cff',
    textDecoration: 'none',
    fontWeight: 500,
  },
  text: {
    marginTop: '18px',
    textAlign: 'center',
    color: '#555',
    fontSize: '0.97rem',
  },
};

const SignIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [btnHover, setBtnHover] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      await updateProfile(userCredentials.user, {
        displayName: userDetails.name,
      });
      alert(`user ${userDetails.name} loggedIn successfully`);
      navigate('/Home');
    } catch (error) {
      console.error('SignIn error', error);
      switch (error.code) {
        case 'auth/user-not-found':
          alert('No user found with this email.');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password.');
          break;
        case 'auth/invalid-email':
          alert('Invalid email format.');
          break;
        default:
          alert(`Sign-in failed (${error.code}): ${error.message}`);
      }
    }
  };

  return (
    <form style={styles.container} onSubmit={handleSignIn}>
      <h2 style={styles.heading}>Sign In</h2>
      <input
        style={styles.input}
        type="text"
        placeholder="Name"
        value={userDetails.name}
        onChange={(e) =>
          setUserDetails({ ...userDetails, name: e.target.value })
        }
        autoComplete="username"
      />
      <input
        style={styles.input}
        type="email"
        placeholder="Email"
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails({ ...userDetails, email: e.target.value })
        }
        autoComplete="email"
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails({ ...userDetails, password: e.target.value })
        }
        autoComplete="current-password"
      />
      <button
        type="submit"
        style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
      >
        Sign In
      </button>
      <p style={styles.text}>
        Don't have an account?{' '}
        <Link style={styles.link} to={'/SignUp'}>
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default SignIn;