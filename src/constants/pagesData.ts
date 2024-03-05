import { ComponentType } from 'react';
import UpdateDishForm from '../components/form/dish/UpdateDishForm';
import UpdateMenuForm from '../components/form/menu/UpdateMenuForm';
import CreateDishPage from '../pages/CreateDishPage';
import CreateMenuPage from '../pages/CreateMenuPage';
import DishesPage from '../pages/DishesPage';
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import MenuDetailedPage from '../pages/MenuDetailedPage';
import MenusPage from '../pages/MenusPage';
import RegistrationPage from '../pages/RegistrationPage';
import { Scope } from './commonConstants';

export type PageData = {
  page: string;
  title?: string;
  route: string;
  component: ComponentType;
  availableFor: Scope[];
};

type PageDataList = {
  [key: string]: PageData;
};

export const PAGES_DATA: PageDataList = {
  HOME: {
    page: 'home',
    title: 'navBar.home',
    route: '/',
    component: MenusPage,
    availableFor: ['ADMIN', 'CHEF', 'CLIENT'],
  },
  CREATE_MENU: {
    page: 'create-menu',
    title: 'navBar.createMenu',
    route: '/menus/create',
    component: CreateMenuPage,
    availableFor: ['CHEF'],
  },
  UPDATE_MENU: {
    page: 'update-menu',
    route: '/menus/:menuId/update',
    component: UpdateMenuForm,
    availableFor: ['CHEF'],
  },
  MENU: {
    page: 'menu',
    route: '/menus/:menuId',
    component: MenuDetailedPage,
    availableFor: ['ADMIN', 'CHEF', 'CLIENT'],
  },
  DISHES: {
    page: 'dishes',
    title: 'navBar.dishes',
    route: '/dishes',
    component: DishesPage,
    availableFor: ['ADMIN', 'CHEF'],
  },
  CREATE_DISH: {
    page: 'create-dish',
    title: 'navBar.createDish',
    route: '/dishes/create',
    component: CreateDishPage,
    availableFor: ['ADMIN'],
  },
  UPDATE_DISH: {
    page: 'update-dish',
    route: '/dishes/:dishId/update',
    component: UpdateDishForm,
    availableFor: ['ADMIN'],
  },
  LOGIN: {
    page: 'login-page',
    title: 'navBar.login',
    route: '/',
    component: LoginPage,
    availableFor: ['Authentication'],
  },
  LOGOUT: {
    page: 'logout',
    title: 'navBar.logout',
    route: '/logout',
    component: LogoutPage,
    availableFor: ['ADMIN', 'CHEF', 'CLIENT'],
  },
  REGISTRATION: {
    page: 'registration',
    title: 'navBar.registration',
    route: '/register',
    component: RegistrationPage,
    availableFor: ['Authentication'],
  },
};
