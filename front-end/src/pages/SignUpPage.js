import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const SignUpPage = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [confirmPasswordValue, setConfirmPasswordValue] =
    useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const onSignUpClicked = async () => {
    console.log('Sign Up not implemented yet');
  };
  return (
    <div className='content-container'>
      <h1>Sign Up</h1>

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
        onChange={(e) => setConfirmPasswordValue(e.target.value)}
      />
      <input
        type='password'
        name=''
        id=''
        placeholder='confirm password'
        value={confirmPasswordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <hr />
      <button
        disabled={
          !emailValue ||
          !passwordValue ||
          passwordValue !== confirmPasswordValue
        }
        onClick={onSignUpClicked}
      >
        Sign Up
      </button>

      <button onClick={() => history.push('/login')}>
        Already have an account? Log In
      </button>
    </div>
  );
};
