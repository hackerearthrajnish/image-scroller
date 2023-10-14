import { configureStore } from "@reduxjs/toolkit";
import ImageSlice from "../Features/ImageSlice";

const Store = configureStore ({
    reducer : {
        Images : ImageSlice
    }
})

export default Store