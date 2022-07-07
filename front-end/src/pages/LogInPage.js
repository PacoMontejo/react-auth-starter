import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const LogInPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const onLogInClicked = async () => {
    console.log('Log in not implemented yet');
  };
  return (
    <div className='content-container'>
      <h1>log In</h1>

      {errorMessage && (
        <div className='fail'>{errorMessage}</div>
      )}

      <input
        type='email'
        placeholder='someone@gmail.com'
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
      />
      <input
        type='password'
        name=''
        id=''
        placeholder='password'
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <button
        disabled={!emailValue || !passwordValue}
        onClick={onLogInClicked}
      >
        Log In
      </button>
      <button
        onClick={() => history.push('/forgot-password')}
      >
        Forgot your password?
      </button>
      <button onClick={() => history.push('/signup')}>
        Don't have an account? Sign Up
      </button>
    </div>
  );
};
