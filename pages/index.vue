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
    if (!localStorage.getItem("savedArticles")) {
      localStorage.setItem("savedArticles", JSON.stringify([]));
    }
    if (!localStorage.getItem("myArticles")) {
      localStorage.setItem("myArticles", JSON.stringify([]));
    }
  },
};
</script>
