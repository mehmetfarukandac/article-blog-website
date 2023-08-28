<template>
  <div class="container-fluid">
    <div v-if="myArticles.length === 0">
      <h1 class="text-center">Hiç Yayınlanmış makaleniz yok!</h1>
      <lottie
        :width="520"
        :height="520"
        :options="lottieOptions"
        v-on:animCreated="handleAnimation"
      />
    </div>
    <div v-else>
      <h1 class="mt-2">Makalelerim</h1>
      <div class="flex flex-wrap">
        <div
          v-for="(article, index) in myArticles"
          :key="index"
          class="w-full px-2 pb-2 mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
          <ArticleItem
            :article="article"
            :index="index"
            :deleteArticle="deleteArticle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "~/components/ArticleItem.vue"; // ArticleItem bileşeninize göre düzenleyin
import Blog from "../layouts/blog.vue";
import lottie from "vue-lottie/src/lottie.vue";
import { mapState } from "vuex";

import * as animationData from "../assets/lotties/no-value-lottie.json";
export default {
  layout: "blog",

  components: {
    ArticleItem,
    Blog,
    lottie,
  },
  data() {
    return {
      anim: null,
      lottieOptions: { animationData: animationData.default },
    };
  },
  computed: {
    ...mapState(["myArticles"]),
    articleList() {
      const localStorageData = localStorage.getItem("articleList");
      console.log(
        "localStorageDatalocalStorageDatalocalStorageData: ",
        JSON.parse(localStorageData)
      );
      return JSON.parse(localStorageData) || [];
    },
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim;
    },
    getMyArticles() {
      const localStorageData = JSON.parse(localStorage.getItem("myArticles"));
      const localStorageArticleList = JSON.parse(
        localStorage.getItem("articleList")
      );
      const myArticleList = [];

      for (let index = 0; index < localStorageArticleList.length; index++) {
        const elementArticles = localStorageArticleList[index];
        for (let index = 0; index < localStorageData.length; index++) {
          const elementmy = localStorageData[index];
          if (elementArticles.id == parseInt(elementmy)) {
            myArticleList.push(elementArticles);
          }
        }
      }

      if (localStorageData) {
        this.$store.commit("updateMyArticles", myArticleList);
      }

      // const localStorageMyArticles = JSON.parse(
      //   localStorage.getItem("myArticles")
      // );
      // const localStorageArticleList = JSON.parse(
      //   localStorage.getItem("articleList")
      // );
      // let filteredArticleList = null;

      // for (let index = 0; index < localStorageMyArticles.length; index++) {
      //   const element = localStorageMyArticles[index];
      //   filteredArticleList = localStorageArticleList.filter(
      //     (event) => event.id == element
      //   );
      // }

      // if (localStorageMyArticles) {
      //   this.$store.commit("updateMyArticles", filteredArticleList);
      // }
    },
    deleteArticle(articleId) {
      const localStorageData = JSON.parse(localStorage.getItem("myArticles"));

      const articles = localStorageData.filter(
        (element) => !(parseInt(element) == parseInt(articleId))
      );

      localStorage.setItem("myArticles", JSON.stringify(articles));
      this.getMyArticles();
    },
  },
  mounted() {
    this.getMyArticles();
  },
};
</script>
