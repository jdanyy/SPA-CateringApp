import { AxiosError } from 'axios';
import { dishesUri } from '../constants/apiConstants';
import { CreateDish, Dish, PaginatedData, SimplifiedPgData } from '../types/commonTypes';
import { errorMessageTransformer } from '../util/errorMessageTransformer';
import { axiosInstance } from './config/axiosConfig';

export async function fetchDishes(pageNr: number = 0, sortByOption: string = 'id'): Promise<SimplifiedPgData<Dish>> {
  let response;
  try {
    response = await axiosInstance.get<PaginatedData<Dish>>(dishesUri, {
      params: {
        page: pageNr,
        sortBy: sortByOption,
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

export async function fetchDish(dishId: number): Promise<Dish> {
  const composedUrl = `${dishesUri}/${dishId}`;

  let response;
  try {
    response = await axiosInstance.get<Dish>(composedUrl);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  return response.data;
}

export async function createDish(createData: CreateDish): Promise<Dish> {
  let response;

  try {
    response = await axiosInstance.post<Dish>(dishesUri, createData);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  return response.data;
}

export async function updateDish(dishId: number, updateData: CreateDish): Promise<Dish> {
  const composedUrl = `${dishesUri}/${dishId}`;
  let response;

  try {
    response = await axiosInstance.put<Dish>(composedUrl, updateData);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }

  return response.data;
}

export async function deleteDish(dishId: number): Promise<void> {
  const composedUrl = `${dishesUri}/${dishId}`;
  try {
    await axiosInstance.delete<void>(composedUrl);
  } catch (error) {
    const message = errorMessageTransformer(error as AxiosError);
    throw new Error(message);
  }
}
