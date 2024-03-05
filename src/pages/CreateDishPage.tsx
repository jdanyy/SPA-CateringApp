import { Box } from '@mui/material';
import CreateDishForm from '../components/form/dish/CreateDishForm';

export default function CreateDishPage() {
  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <CreateDishForm />
    </Box>
  );
}
