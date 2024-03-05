import { Box } from '@mui/material';
import RegistrationForm from '../components/form/auth/RegistrationFrom';

export default function RegistrationPage() {
  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <RegistrationForm />
    </Box>
  );
}
