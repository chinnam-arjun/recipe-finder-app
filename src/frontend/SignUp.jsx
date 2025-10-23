import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

const SignUp = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      await updateProfile(userCredentials.user, {
        displayName: userDetails.name,
      });
      alert(`User ${userDetails.name} registered successfully`);
      navigate('/Home');

    } catch (error) {
      // Log full error to console for debugging (includes .code)
      console.error('SignUp error', error);
      alert(`Sign-up failed (${error.code}): ${error.message}`);
    }
  };
  return (
    <form onSubmit={handleSignUp} style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        style={styles.input}
        value={userDetails.name}
        onChange={(e) =>
          setUserDetails({
            ...userDetails,
            name: e.target.value,
          })
        }
        required
      />
      <input
        type="email"
        placeholder="Email"
        style={styles.input}
        value={userDetails.email}
        onChange={(e) =>
          setUserDetails({
            ...userDetails,
            email: e.target.value,
          })
        }
        required
      />
      <input
        type="password"
        placeholder="Password"
        style={styles.input}
        value={userDetails.password}
        onChange={(e) =>
          setUserDetails({
            ...userDetails,
            password: e.target.value,
          })
        }
        required
      />
      <button type="submit" style={styles.button}>
        Sign Up
      </button>
      <p style={styles.text}>
        Already have an account?{' '}
        <Link to={'/SignIn'} style={styles.link}>
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default SignUp;