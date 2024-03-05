import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createDish, deleteDish, fetchDish, fetchDishes, updateDish } from '../api/dishApi';
import { CreateDish } from '../types/commonTypes';

export function useDishes(pageNr: number) {
  return useQuery({
    queryKey: ['dishes', pageNr],
    queryFn: () => fetchDishes(pageNr),
    placeholderData: keepPreviousData,
  });
}

export function useDish(dishId: number) {
  return useQuery({
    queryKey: ['dishes', dishId],
    queryFn: () => fetchDish(dishId),
    refetchInterval: Infinity,
  });
}

export function useCreateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dish: CreateDish) => createDish(dish),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });
}

type UpdateMutationFn = {
  dishId: number;
  updateData: CreateDish;
};

export function useUpdateDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: UpdateMutationFn) => updateDish(props.dishId, props.updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });
}

export function useDeleteDish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dishId: number) => deleteDish(dishId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dishes'] });
    },
  });
}
