<template>
  <div class="container-fluid">
    <div v-if="savedArticles.length === 0">
      <h1 class="text-center">Kaydedilmiş makale yok.</h1>
      <lottie
        :width="520"
        :height="520"
        :options="lottieOptions"
        v-on:animCreated="handleAnimation"
      />
    </div>
    <div v-else>
      <h1 class="mt-2">Okuma Listem</h1>
      <div class="flex flex-wrap">
        <div
          v-for="(article, articleIndex) in savedArticles"
          :key="articleIndex"
          class="w-full px-2 pb-2 mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <ArticleItem
            :article="article"
            :index="parseInt(articleIndex)"
            :deleteArticle="deleteArticle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "~/components/ArticleItem.vue"; // ArticleItem'ın bulunduğu yol
import lottie from "vue-lottie/src/lottie.vue";
import Blog from "../layouts/blog.vue";
import * as animationData from "../assets/lotties/no-value-lottie.json";
import { mapState } from "vuex";
export default {
  layout: "blog",
  components: { Blog, ArticleItem, lottie },
  data() {
    return {
      anim: null,
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    deleteArticle(articleId) {
      const localStorageData = JSON.parse(
        localStorage.getItem("savedArticles")
      );
      const articles = localStorageData.filter(
        (element) => !(parseInt(element) == parseInt(articleId))
      );

      localStorage.setItem("savedArticles", JSON.stringify(articles));
      this.getSavedArticles();
    },
    getSavedArticles() {
      const localStorageData = JSON.parse(
        localStorage.getItem("savedArticles")
      );
      const localStorageArticleList = JSON.parse(
        localStorage.getItem("articleList")
      );
      const savedArticleList = [];

      for (let index = 0; index < localStorageArticleList.length; index++) {
        const elementArticles = localStorageArticleList[index];
        for (let index = 0; index < localStorageData.length; index++) {
          const elementSaved = localStorageData[index];
          if (elementArticles.id == parseInt(elementSaved)) {
            savedArticleList.push(elementArticles);
          }
        }
      }

      if (localStorageData) {
        this.$store.commit("updateSavedArticles", savedArticleList);
      }
    },
  },
  computed: {
    ...mapState(["savedArticles"]),
  },
  mounted() {
    this.getSavedArticles();
  },
};
</script>
