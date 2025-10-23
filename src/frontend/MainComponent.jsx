import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainComponent = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/SignIn')
  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
    fontFamily: 'Segoe UI, sans-serif'
  }

  const cardStyle = {
    background: '#fff',
    padding: '40px 32px',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    textAlign: 'center'
  }

  const buttonStyle = {
    marginLeft: '12px',
    padding: '8px 24px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem'
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ marginBottom: 8 }}>Welcome to the Recipe <br />MAKER</h1>
        <h4 style={{ color: '#6366f1', marginBottom: 24 }}>your home chef</h4>
        <h6 style={{ fontWeight: 400 }}>
          Please, sign in to continue
          <button style={buttonStyle} onClick={handleClick}>Sign In</button>
        </h6>
      </div>
    </div>
  )
}

export default MainComponent