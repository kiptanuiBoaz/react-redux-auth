import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include", //allow cookies
    prepareHeaders: (headers, { getState }) => {
        //send acces token the headers each time    
        const token = getState().auth.token;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers
    }
})

//custom query function for retrying auth
const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log(result);
    //look out for status codes
    if (result?.error?.originalStatus === 403) {
        console.log("Sending refresh token");
        //send refresh token to get new acces token 
        const refreshResult = await baseQuery("/refresh", api, extraOptions);
        console.log(refreshResult)

        if (result?.data) {
            //get username from state
            const user = api.getState.api().auth
            //store the new token
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            // retry the original query with the new access token
            await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({})
})