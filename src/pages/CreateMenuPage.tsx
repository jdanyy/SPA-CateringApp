import { Box } from '@mui/material';
import CreateMenuForm from '../components/form/menu/CreateMenuForm';

export default function CreateMenuPage() {
  return (
    <Box maxWidth={600} mx="auto" mt={2}>
      <CreateMenuForm />
    </Box>
  );
}
