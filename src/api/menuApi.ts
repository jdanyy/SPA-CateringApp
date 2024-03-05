import { AxiosError } from 'axios';
import { menusUri } from '../constants/apiConstants';
import { CreateAndUpdateMenu, Menu, PaginatedData, SimplifiedPgData } from '../types/commonTypes';
import { errorMessageTransformer } from '../util/errorMessageTransformer';
import { axiosInstance } from './config/axiosConfig';

export async function fetchAllMenus(pageNr: number = 0): Promise<SimplifiedPgData<Menu>> {
  let response;
  try {
    response = await axiosInstance.get<PaginatedData<Menu>>(menusUri, {
      params: {
        page: pageNr,
      },
    });
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  const hasMore = response.data.pagination.next !== '';

  return {
    hasMore,
    content: response.data.content,
  };
}

export async function fetchMenu(menuId: number): Promise<Menu> {
  let response;
  const composedUrl = `${menusUri}/${menuId}`;
  try {
    response = await axiosInstance.get<Menu>(composedUrl);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  return response.data;
}

export async function createMenu(data: CreateAndUpdateMenu): Promise<Menu> {
  let response;
  try {
    response = await axiosInstance.post<Menu>(menusUri, data);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  return response.data;
}

export async function updateMenu(menuId: number, data: CreateAndUpdateMenu): Promise<Menu> {
  let response;
  try {
    response = await axiosInstance.put<Menu>(`${menusUri}/${menuId}`, data);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  return response.data;
}

export async function deleteMenu(menuId: number): Promise<void> {
  try {
    await axiosInstance.delete(`${menusUri}/${menuId}`);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }
}
