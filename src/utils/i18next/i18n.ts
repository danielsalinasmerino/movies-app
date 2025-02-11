import i18next from "i18next";

i18next.init({
  lng: "en",
  debug: true,
  resources: {
    en: {
      translation: {
        component: {
          header: {
            placeholder: "Search",
          },
          movieList: {
            showingResults: `Showing results for "{{query}}"`,
            noResultsFound: `No results found for "{{query}}"`,
            movieListItem: {
              noImageAvailable: "No Image Available",
            },
          },
        },
        page: {
          search: {
            showMoreResults: "Show more results",
          },
        },
      },
    },
  },
});

export default i18next;
