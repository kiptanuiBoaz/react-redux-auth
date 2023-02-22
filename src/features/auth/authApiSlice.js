import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loging: builder.mutation({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body:{...credentials}
            })
        })
    })
});

//export generated hooks from authApiSlice
export const {useLoginMutation} = authApiSlice;