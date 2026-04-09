import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper, Container } from '@mui/material';
import { useLoginMutation } from '../../app/apiSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

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
      try {
        const result: any = await login(values).unwrap();
        // API response এ টোকেন ফিল্ডটা চেক করে নিও (সাধারণত result.token হয়)
        localStorage.setItem('token', result.token || result.accessToken); 
        navigate('/dashboard');
      } catch (err) {
        alert('Login failed! Check credentials.');
      }
    },
  });

  return (
    <Container maxWidth="xs" className="h-screen flex items-center justify-center">
      <Paper elevation={6} className="p-8 w-full rounded-2xl shadow-xl">
        <Typography variant="h4" className="font-bold text-center mb-2 text-blue-600">
          CSE Portal
        </Typography>
        <Typography variant="body2" className="text-center mb-6 text-gray-500">
          Login to manage your courses & categories
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            className="mb-4"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            className="mb-6"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button 
            fullWidth 
            variant="contained" 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 py-3 text-lg capitalize font-semibold shadow-md"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;