import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'




const initialState = {
    Images: [],
    loading: false,
    err: ''
}


const getImages = createAsyncThunk('Images/getImages', async () => {
    const respose = await axios.get(`https://picsum.photos/v2/list`)
    return respose.data
})


const Imageslice = createSlice({
    name: "Images",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getImages.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getImages.fulfilled, (state, action) => {
            state.loading = false
            state.Images = action.payload
            state.err = ''
        })
        builder.addCase(getImages.rejected, (state, action) => {
            state.loading = false
            state.Images = []
            state.err = action.error

        })
    }

})

export default Imageslice.reducer
export { getImages }