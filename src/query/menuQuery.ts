import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMenu, deleteMenu, fetchAllMenus, fetchMenu, updateMenu } from '../api/menuApi';
import { CreateAndUpdateMenu } from '../types/commonTypes';

export function useFetchAllMenus(pageNr: number) {
  return useQuery({
    queryKey: ['menus', { page: pageNr }],
    queryFn: () => fetchAllMenus(pageNr),
    placeholderData: keepPreviousData,
    staleTime: 5000,
    refetchInterval: 6000,
  });
}

export function useFetchMenu(id: number) {
  return useQuery({
    queryKey: ['menus', id],
    queryFn: () => fetchMenu(id),
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menu: CreateAndUpdateMenu) => createMenu(menu),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
}

export type UpdateMutationFn = {
  menu: CreateAndUpdateMenu;
  menuId: number;
};

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: UpdateMutationFn) => updateMenu(params.menuId, params.menu),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (menuId: number) => deleteMenu(menuId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menus'] });
    },
  });
}
