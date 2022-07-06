import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  countries: [],
  status: null,
  error: null,
};

export const getCountry = createAsyncThunk(
  "countries/getCountry",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");

      dispatch(setCountry(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.countries = action.payload;
    },
  },
  extraReducers: {
    [getCountry.pending]: (state) => {
      state.status = "loading";
    },
    [getCountry.fulfilled]: (state) => {
      state.status = "fulfilled";
    },
    [getCountry.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "rejected";
    },
  },
});

export const { setCountry } = countrySlice.actions;
export default countrySlice.reducer;
