import { Box } from '@mui/material';
import LoginForm from '../components/form/auth/LoginForm';

export default function LoginPage() {
  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <LoginForm />
    </Box>
  );
}
