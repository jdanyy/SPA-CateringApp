export type CreateDish = {
  name: string;
};

export type Dish = CreateDish & {
  id: number;
};

export type Menu = {
  id: number;
  price: number;
  dishes: Dish[];
  menuTitle: string;
  rating: number;
  calories: number;
};

export type CreateAndUpdateMenu = {
  menuTitle: string;
  price: number;
  rating: number;
  calories: number;
  dishes: Dish[];
};

export type FormLabelProp = {
  title: string;
  submitButton: string;
};

export type UserRole = {
  id: number;
  name: string;
};

export type UserData = {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
  theme: string;
  lang: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RegistrationData = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
  theme: string;
};

type Pagination = {
  limit: number;
  totalPages: number;
  pageNum: number;
  next: string;
  prev: string;
};

export type PaginatedData<T> = {
  content: T[];
  pagination: Pagination;
};

export type SimplifiedPgData<T> = {
  content: T[];
  hasMore: boolean;
};

export type UserThemeUpdate = {
  theme: string;
};

export type UserLanguageUpdate = {
  lang: string;
};
