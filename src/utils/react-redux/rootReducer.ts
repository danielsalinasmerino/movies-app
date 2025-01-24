import { combineReducers } from "@reduxjs/toolkit";

import moviesSearchReducer from "@/utils/react-redux/features/moviesSearchSlice";

const rootReducer = combineReducers({
  moviesSearch: moviesSearchReducer,
});

export default rootReducer;
