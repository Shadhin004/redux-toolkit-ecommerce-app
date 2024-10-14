import { Product, ApiResponse } from './../types';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type searchParam ={
    name : string,
    sortBy : string,
    skip : string,
    limit : number
}
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
      baseUrl: `https://dummyjson.com/`,
    }),
    tagTypes: [
        "Products",
        "Product"
      ],
    endpoints: (build) => ({
        getProducts: build.query <Product[], void>({
          query: () => `products`,
          providesTags: ["Products"],
        }),
        getProductById: build.query<Product, number>({
            query: (id) => `products/${id}`,
            providesTags: ["Product"]
        }),
        deleteProducts: build.mutation<Product, number>({
            query: (id) =>({
                url : `products/${id}`,
                method : 'DELETE',
            }),
            invalidatesTags: ["Products"]
        }),
        searchProducts: build.query<ApiResponse, searchParam>({
            query: (params)=>`products/search?q=${params.name}&sortBy=${params.sortBy}&skip=${params.skip}&limit=${params.limit}`,
            providesTags: ["Products"]
        })
    })
})

export const {
    useGetProductsQuery, useGetProductByIdQuery, useDeleteProductsMutation, useSearchProductsQuery
} = productApi;