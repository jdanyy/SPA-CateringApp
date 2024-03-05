import { Button, TextField, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CreateDish, FormLabelProp } from '../../../types/commonTypes';

type Props = {
  formLabel: FormLabelProp;
  onSubmit: (_: CreateDish) => void;
  initialValues?: CreateDish;
};

export default function DishForm({ formLabel, onSubmit: setCreationData, initialValues = { name: '' } }: Props) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDish>({ defaultValues: initialValues });

  const handleRegistration: SubmitHandler<CreateDish> = (formData) => {
    setCreationData(formData);
  };

  return (
    <>
      <Typography sx={{ mb: 2 }}>{formLabel.title}</Typography>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <TextField
          label={t('commonDishFormLabels.name')}
          variant="outlined"
          fullWidth
          {...register('name', { required: t('commonDishFormLabels.dishNameRequired') })}
          error={!!errors.name}
          helperText={errors.name?.message ?? ''}
        />
        <Button type="submit" sx={{ mt: 2 }}>
          {formLabel.submitButton}
        </Button>
      </form>
    </>
  );
}
