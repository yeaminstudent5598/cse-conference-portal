import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useState } from 'react';
import { useLoginMutation } from '../../services/api';

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [errorMsg, setErrorMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      email: 'system@admin.com',
      password: 'password123',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setErrorMsg('');
      try {
        const raw = await login(values).unwrap();
        let token = '';

        if (typeof raw === 'string') {
          token = raw;
        } else if (raw && typeof raw === 'object') {
          token = raw.token || raw.Token || raw.accessToken || raw.jwt || raw.data || '';
        }

        // ✅ টোকেন থেকে সব ধরণের কোটেশন এবং 'Bearer ' শব্দটা আগেই মুছে ফেলছি
        token = String(token).replace(/["']/g, '').replace(/Bearer /gi, '').trim();

        if (!token || token.length < 20) {
          setErrorMsg('Invalid token format received.');
          return;
        }

        localStorage.setItem('token', token);
        
        // ✅ ব্রাউজারকে একটু সময় দেওয়া স্টোরেজ আপডেট করার জন্য
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 50);

      } catch (err: any) {
        setErrorMsg('Login failed. Check credentials.');
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Paper elevation={3} className="p-8 w-full max-w-md rounded-2xl">
        <div className="text-center mb-8">
          <Typography variant="h4" className="font-bold text-blue-600 mb-2">
            CSE Portal
          </Typography>
          <Typography variant="body1" className="text-gray-500">
            Sign in to manage courses & categories
          </Typography>
        </div>

        {errorMsg && (
          <Alert severity="error" className="mb-4">{errorMsg}</Alert>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isLoading}
            className="h-12 text-base font-semibold shadow-md mt-2"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;