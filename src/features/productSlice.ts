import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products : []
}
export const productSlice = createSlice({
    name : 'products',
    initialState: initialState,
    reducers : { }
})

export default productSlice.reducer