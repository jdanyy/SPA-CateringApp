import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { ThemeContext } from '../../../context/ThemeContext';
import { useDishes } from '../../../query/dishQuery';
import { CreateAndUpdateMenu, Dish } from '../../../types/commonTypes';
import QueryStateComponent from '../../QueryStateComponent';

type Props = {
  formLabel: string;
  onSubmit: (menu: CreateAndUpdateMenu) => void;
  initialValues?: CreateAndUpdateMenu;
};

export default function MenuForm({
  onSubmit: setMenuData,
  initialValues = { menuTitle: '', price: 1, calories: 0, dishes: [], rating: 0 },
  formLabel,
}: Props) {
  const { t } = useTranslation();
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { currentTheme } = useContext(ThemeContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAndUpdateMenu>({ defaultValues: initialValues });

  const handleRegistration: SubmitHandler<CreateAndUpdateMenu> = (formData) => {
    formData.dishes = selectedDishes;
    setMenuData(formData);
  };

  const {
    data: dishes,
    isError: isDishesError,
    isSuccess: isDishesSuccess,
    error: dishesError,
    isLoading: isDishesLoading,
  } = useDishes(currentPage);

  const loadOptions = useCallback(
    (_inputValue: string, _prevOptions: OptionsOrGroups<Dish, GroupBase<Dish>>, additional?: { page: number }) => {
      if (isDishesError || !isDishesSuccess) {
        return {
          options: [],
          hasMore: false,
          additional: {
            page: 0,
          },
        };
      }

      setCurrentPage((prevPage) => (dishes.hasMore ? prevPage + 1 : prevPage));
      return {
        options: dishes.content,
        hasMore: dishes.hasMore,
        additional: {
          page: (additional?.page || currentPage) + 1,
        },
      };
    },
    [isDishesError, isDishesSuccess, dishes, currentPage],
  );

  const handleDishesChange = useCallback((newValue: MultiValue<Dish>, actionMeta: ActionMeta<Dish>) => {
    if (actionMeta.action === 'select-option' || actionMeta.action === 'remove-value') {
      const updatedDishes = newValue.map((option) => option);
      setSelectedDishes(updatedDishes);
    }
  }, []);

  return (
    <>
      <Typography sx={{ fontWeight: 'bold', fontSize: 32, mb: 2 }} alignSelf="center">
        {formLabel}
      </Typography>
      <form onSubmit={handleSubmit(handleRegistration)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div>
          <InputLabel htmlFor="title">{t('menuFormLabels.title')}</InputLabel>
          <TextField
            id="title"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('menuTitle', { required: t('menuFormLabels.titleRequired') })}
            error={!!errors.menuTitle}
            helperText={errors.menuTitle?.message}
          />
        </div>
        <div>
          <InputLabel htmlFor="price">{t('menuFormLabels.price')}</InputLabel>
          <TextField
            id="price"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            {...register('price', {
              required: t('menuFormLabels.priceRequired'),
              pattern: {
                value: /^([0-9]*[.])?[0-9]+$/,
                message: t('menuFormLabels.invalidFloat'),
              },
              min: { value: 1, message: t('menuFormLabels.priceGraterThen') },
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </div>
        <div>
          <InputLabel htmlFor="async-select">{t('menuFormLabels.dishSelect')}</InputLabel>
          <AsyncPaginate
            id="async-select"
            isMulti
            getOptionLabel={(option: Dish) => option.name}
            getOptionValue={(option: Dish) => String(option.id)}
            value={selectedDishes}
            loadOptions={loadOptions}
            additional={{
              page: currentPage,
            }}
            onChange={handleDishesChange}
            theme={(baseTheme) => ({
              ...baseTheme,
              colors: {
                ...baseTheme.colors,
                primary: currentTheme.palette.primary.contrastText,
              },
              option: {
                color: '#ffffff',
              },
            })}
          />
          <QueryStateComponent isError={isDishesError} error={dishesError} isLoading={isDishesLoading} />
        </div>
        <div>
          <InputLabel htmlFor="rating">{t('menuFormLabels.rating')}</InputLabel>
          <TextField
            id="rating"
            variant="outlined"
            fullWidth
            margin="normal"
            type="text"
            {...register('rating', {
              required: t('menuFormLabels.ratingRequired'),
              pattern: {
                value: /^([0-9]*[.])?[0-9]+$/,
                message: t('menuFormLabels.invalidFloat'),
              },
            })}
            error={!!errors.rating}
            helperText={errors.rating?.message}
          />
        </div>
        <div>
          <InputLabel htmlFor="calories">{t('menuFormLabels.calories')}</InputLabel>
          <TextField
            id="calories"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            {...register('calories', { required: t('menuFormLabels.caloriesRequired') })}
            error={!!errors.calories}
            helperText={errors.calories?.message}
          />
        </div>
        <Button type="submit">{t('menuFormLabels.createFormButton')}</Button>
      </form>
    </>
  );
}
