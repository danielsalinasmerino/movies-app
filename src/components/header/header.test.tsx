import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import Header from "@/components/header/header";
import { setSearchValue } from "@/utils/react-redux/features/moviesSearchSlice";
import "@testing-library/jest-dom";

const mockStore = configureStore([]);

describe("Header Component", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      moviesSearch: {
        isLoading: false,
        searchValue: "",
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the logo", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logo = screen.getByAltText("TMDB logo");
    expect(logo).toBeInTheDocument();
  });

  it("renders the search input", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search");
    expect(input).toBeInTheDocument();
  });

  it("updates the search input value on user input", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const input = screen.getByPlaceholderText("Search") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Inception" } });

    expect(store.dispatch).toHaveBeenCalledWith(setSearchValue("Inception"));
  });

  it("shows the loader when isLoadingMoviesSearch is true", () => {
    store = mockStore({
      moviesSearch: {
        isLoading: true,
        searchValue: "",
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const loader = screen.queryByTestId("loader");
    expect(loader).toBeInTheDocument();
    expect(loader?.parentElement).toHaveStyle("opacity: 1");
  });

  it("hides the loader when isLoadingMoviesSearch is false", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const loader = screen.queryByTestId("loader");
    expect(loader?.parentElement).toHaveStyle("opacity: 0");
  });
});
