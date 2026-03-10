
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppliedFilter } from "../types/User";

interface FilterState {
  selectField: string | null;
  selectValue: string | number | null;
  appliedFilter: AppliedFilter;
}

const initialState: FilterState = {
  selectField: null,
  selectValue: null,
  appliedFilter: { field: "", uniqueVal: "" },
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeField: (state, action: PayloadAction<string | null>) => {
      state.selectValue = null;
      state.selectField = action.payload;
    },
    changeValue: (state, action: PayloadAction<string | number | null>) => {
      state.selectValue = action.payload;
    },
    handleFilterButton: (
      state,
      action: PayloadAction<{ selectingField: string; selectingValue: string | number }>
    ) => {
      const { selectingField, selectingValue } = action.payload;
      state.appliedFilter.field = selectingField;
      state.appliedFilter.uniqueVal = selectingValue;
    },
    handleAllButton: (state) => {
      state.selectField = null;
      state.selectValue = null;
      state.appliedFilter.field = "";
      state.appliedFilter.uniqueVal = "";
    },
    resetFilterValue: (state) => {
      state.selectValue = null;
      state.appliedFilter = { field: null, uniqueVal: "" };
      // selectField stays unchanged!
    },
  },
});

export const { changeField, changeValue, handleFilterButton,resetFilterValue, handleAllButton } =
  FilterSlice.actions;

export default FilterSlice.reducer;