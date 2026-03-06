import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectField:  null,
  selectValue: "",
  appliedFilter: { field: "", uniqueVal: "" },
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeField: (state, action) => {
      state.selectField  = action.payload;
      console.log("after updating field", state.selectField);
    },
    changeValue: (state, action) => {
      state.selectValue = action.payload;
      console.log("after updating value", state.selectValue);},

    handleFilterButton: (state, action) => {
      const {selectingField, selectingValue} = action.payload;
      state.appliedFilter.field = selectingField;
      state.appliedFilter.uniqueVal = selectingValue;
      console.log("after updating applied filter", state.appliedFilter);
    },
    handleAllButton: (state) => {
      state.selectField = null;
      state.selectValue = "";
      state.appliedFilter.field = "";
      state.appliedFilter.uniqueVal = "";
    },
  },
});

export const {changeField, changeValue, handleFilterButton, handleAllButton} = FilterSlice.actions;

export default FilterSlice.reducer;