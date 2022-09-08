import { useCallback, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import authApi from '../api/authApi';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setUsernameErrText('');
      setPasswordErrText('');
      setConfirmPasswordErrText('');

      const data = new FormData(e.target as HTMLFormElement);
      const username = (data?.get('username') as string).trim();
      const password = (data?.get('password') as string).trim();
      const confirmPassword = (data?.get('confirmPassword') as string).trim();

      let err = false;
      if (username === '') {
        err = true;
        setUsernameErrText('Please fill this field');
      }
      if (password === '') {
        err = true;
        setPasswordErrText('Please fill this field');
      }
      if (confirmPassword === '') {
        err = true;
        setConfirmPasswordErrText('Please fill this field');
      }
      if (password !== confirmPassword) {
        err = true;
        setConfirmPasswordErrText('Confirm password not match');
      }
      if (err) return;

      setLoading(true);

      try {
        const res: any = await authApi.signup({
          username,
          password,
          confirmPassword,
        });
        setLoading(false);
        localStorage.setItem('token', res.token);
        navigate('/');
      } catch (error: any) {
        const errors = error.data.errors;
        errors.forEach((e: any) => {
          if (e.param === 'username') {
            setUsernameErrText(e.msg);
          }
          if (e.param === 'password') {
            setPasswordErrText(e.msg);
          }
          if (e.param === 'confirmPassword') {
            setConfirmPasswordErrText(e.msg);
          }
        });
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <>
      <Box component="form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          disabled={loading}
          error={usernameErrText !== ''}
          helperText={usernameErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          disabled={loading}
          error={passwordErrText !== ''}
          helperText={passwordErrText}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={loading}
          error={confirmPasswordErrText !== ''}
          helperText={confirmPasswordErrText}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant="outlined"
          fullWidth
          color="success"
          type="submit"
          loading={loading}
        >
          Signup
        </LoadingButton>
        <Button component={Link} to="/login" sx={{ transform: 'none' }}>
          Already have an account? Login
        </Button>
      </Box>
    </>
  );
};

export default Signup;
