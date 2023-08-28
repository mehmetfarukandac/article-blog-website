// store/index.js
export const state = () => ({
  articleList: [],
  myArticles: [],
  savedArticles: [],
});

export const mutations = {
  updateArticleList(state, newList) {
    state.articleList = newList;
  },
  updateMyArticles(state, newList) {
    state.myArticles = newList;
  },
  updateSavedArticles(state, newList) {
    state.savedArticles = newList;
  },
};
