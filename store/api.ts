import AppUtil from "@/AppUtil";
import { IClaim, IPaginationQuery, Pagination } from "@/types";
import { configureStore } from "@reduxjs/toolkit";
import {
  createApi,
  fetchBaseQuery,
  TagDescription,
} from "@reduxjs/toolkit/query/react";

interface Post {
  id: number;
  title: string;
  content: string;
}
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
interface TodoSearchPayload {
  search: string;
}
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Post", "Claim"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    prepareHeaders: async (headers, { getState }) => {
      const token = await AppUtil.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    resetPassword: builder.mutation<string, string>({
      query: (email) => ({
        url: "Account/reset-password-request",
        method: "POST",
        body: JSON.stringify("nagarasusubha@gmail.com"),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fetchImageData: builder.mutation<string | null, string>({
      query: (dataURL) => ({
        url: `Common/downloadfile/${dataURL}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
      transformResponse: async (blob: Blob) => {
        return new Promise<string | null>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            reject(null);
          };
          reader.readAsDataURL(blob);
        });
      },
    }),

    claims: builder.query<
      {
        data: IClaim[];
        pagination: Pagination;
      },
      IPaginationQuery
    >({
      query: ({ _page, _per_page, _searchTerm, _startDate, _endDate }) => ({
        url: "Claims",
        params: {
          pageNumber: _page,
          pageSize: _per_page,
          searchterm: _searchTerm,
          startDate: _startDate ? AppUtil.formatDate(_startDate) : undefined,
          endDate: _endDate ? AppUtil.formatDate(_endDate) : undefined,
        },
      }),
      transformResponse(baseQueryReturnValue: IClaim[], meta, arg) {
        return {
          data: baseQueryReturnValue,
          pagination: JSON.parse(
            meta?.response?.headers.get("pagination") ?? "{}"
          ),
        };
      },
      merge: (currentCache, newItems, { arg }) => {
        const { _page } = arg;
        // this check deletes all transactions when account changes
        if (_page === 1) {
          return newItems;
        }
        // more complex update to replace existing data if required
        const updatedData = [
          ...currentCache.data.filter(
            (existingItem) =>
              !newItems.data.some((newItem) => newItem.id === existingItem.id)
          ),
          ...newItems.data,
        ];
        return {
          ...newItems,
          data: updatedData,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      providesTags(
        result,
        error,
        arg,
        meta
      ): readonly TagDescription<"Claim">[] {
        return [
          "Claim",
          ...(result?.data
            ? result.data.map(({ id }) => ({ type: "Claim" as const, id }))
            : []),
        ];
      },
    }),
    deleteClaim: builder.mutation<void, number>({
      query: (id) => ({
        url: `Claims/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Claim"],
    }),
    posts: builder.mutation<Post[], TodoSearchPayload>({
      query: (search) => {
        let params = new URLSearchParams();
        if (search.search) {
          params.append("q", search.search);
        }
        return {
          url: `posts?${params.toString()}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useResetPasswordMutation,
  useFetchImageDataMutation,
  useClaimsQuery,
  useDeleteClaimMutation,
  usePostsMutation,
} = api;

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check middleware
      immutableCheck: false, // Disable immutable check middleware
    }).concat(api.middleware),
});
function getDefaultMiddleware(arg0: {
  serializableCheck: boolean; // Disable serializable check middleware
  immutableCheck: boolean;
}) {
  throw new Error("Function not implemented.");
}
