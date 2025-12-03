import { createApi, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type {
  ProductsResponse,
  Product,
  UsersResponse,
  User,
  UpdateProductPayload,
  ProductMutationPayload,
  UpdateUserPayload,
  UserFormPayload,
  LoginCredentials,
  LoginResponse,
  UserProfile,
} from '@/typings';
import type { RootState } from '@/app';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Products', 'ProductDetail', 'Users', 'UserDetail'],
  endpoints: (builder) => ({
    // MUTATION: login user
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    // QUERY: get auth user profile
    getProfile: builder.query<UserProfile, void>({
      query: () => 'auth/me',
      providesTags: ['UserDetail'],
    }),
    // QUERY: update products list
    getProducts: builder.query<ProductsResponse, number | void>({
      query: (limit = 100) => `products?limit=${limit}`,
      providesTags: ['Products'],
    }),

    // QUERY: get product by ID
    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (_: Product | undefined, __: FetchBaseQueryError | undefined, id) => [
        { type: 'ProductDetail', id },
      ],
    }),

    // QUERY: update users list
    getUsers: builder.query<UsersResponse, number | void>({
      query: (limit = 30) => `users?limit=${limit}`,
      providesTags: ['Users'],
    }),

    // QUERY: get user by ID
    getUserById: builder.query<User, number>({
      query: (id) => `users/${id}`,
      providesTags: (_: User | undefined, __: FetchBaseQueryError | undefined, id) => [
        { type: 'Users', id },
      ],
    }),

    // MUTATION: create product
    createProduct: builder.mutation<Product, ProductMutationPayload>({
      query: (newProduct) => ({
        url: 'products/add',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    // MUTATION: update product
    updateProduct: builder.mutation<Product, UpdateProductPayload>({
      query: ({ id, ...rest }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (_: Product | undefined, __: FetchBaseQueryError | undefined, { id }) => [
        'Products',
        { type: 'ProductDetail', id },
      ],
    }),

    // MUTATION: delete product
    deleteProduct: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // MUTATION: create user
    createUser: builder.mutation<User, UserFormPayload>({
      query: (newUser) => ({
        url: 'users/add',
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),

    // MUTATION: update user
    updateUser: builder.mutation<User, UpdateUserPayload>({
      query: ({ id, ...rest }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (_: User | undefined, __: FetchBaseQueryError | undefined, { id }) => [
        'Users',
        { type: 'UserDetail', id },
      ],
    }),

    // MUTATION: delete user
    deleteUser: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = apiSlice;
