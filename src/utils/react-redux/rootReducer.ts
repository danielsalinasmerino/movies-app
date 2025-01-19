import { combineReducers } from "@reduxjs/toolkit";

import searchReducer from "@/utils/react-redux/features/searchSlice";

const rootReducer = combineReducers({
  search: searchReducer,
});

export default rootReducer;
