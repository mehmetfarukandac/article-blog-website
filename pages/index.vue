<template>
  <div>
    <CreateArticle />
    <ArticleList />
  </div>
</template>

<script>
import ArticleList from "../components/ArticleList.vue";
import CreateArticle from "../components/CreateArticle.vue";
import Blog from "../layouts/blog.vue";

export default {
  layout: "blog",
  // page component definitions
  components: { Blog, ArticleList, CreateArticle },
  mounted() {
    localStorage.setItem("savedArticles", JSON.stringify([]));
    localStorage.setItem("myArticles", JSON.stringify([]));
  },
};
</script>
