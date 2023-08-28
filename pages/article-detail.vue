<template>
  <div class="container p-6 mx-auto">
    <div
      v-if="showForm"
      class="absolute z-50 w-5/6 p-6 mb-4 bg-white rounded-md shadow-2xl shadow-bf-night"
    >
      <form @submit.prevent="updateArticle">
        <div class="mb-4">
          <label
            for="articleTitle"
            class="block text-sm font-medium text-gray-700"
            >Makale Başlığı</label
          >
          <input
            type="text"
            id="articleTitle"
            v-model="updatedArticle.title"
            class="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <div class="mb-4">
          <label
            for="articleDescription"
            class="block text-sm font-medium text-gray-700"
            >Makale Açıklaması</label
          >
          <textarea
            id="articleDescription"
            v-model="updatedArticle.description"
            class="w-full p-2 mt-1 border rounded-md"
            rows="4"
          ></textarea>
        </div>
        <div class="mb-4">
          <label
            for="articleDescription"
            class="block text-sm font-medium text-gray-700"
            >Makale Resmi</label
          >
          <input
            type="text"
            id="articleTitle"
            v-model="updatedArticle.img_url"
            placeholder="Lütfen url giriniz"
            class="w-full p-2 mt-1 border rounded-md"
          />
        </div>
        <button
          type="submit"
          class="px-3 py-2 font-semibold rounded-md text-bf-primary bg-bf-primary/40 hover:bg-bf-primary/80 hover:text-white"
        >
          Güncelle
        </button>
      </form>
    </div>
    <div class="flex items-center justify-between mb-4">
      <div class="flex justify-end w-full">
        <div class="flex gap-x-4">
          <button
            class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-bf-primary shadow-bf-night bg-bf-primary/20 hover:bg-bf-primary/40"
            @click="saveArticle"
          >
            Favorilere ekle
          </button>
          <button
            class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-bf-primary shadow-bf-night bg-bf-primary/20 hover:bg-bf-primary/40"
            @click="toggleForm"
          >
            Makaleyi Güncelle
          </button>
          <button
            class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-bf-secondary shadow-bf-night bg-bf-secondary/20 hover:bg-bf-secondary/40"
            v-if="isArticleSaved"
            @click="removeArticle"
          >
            Favorilerden çıkar
          </button>
        </div>
      </div>
    </div>
    <div class="flex gap-4 mb-6">
      <div class="w-1/3 max-w-xs">
        <img
          :src="article.img_url"
          alt="Makale Görseli"
          class="w-full h-auto"
        />
      </div>
      <div class="w-full p-4 border">
        <h1 class="my-4 text-2xl font-semibold text-center">
          {{ article.title }}
        </h1>
        <p class="mb-6 text-justify text-gray-600">{{ article.description }}</p>
        <div v-html="article.content" class="prose"></div>
      </div>
    </div>
    <!-- Formu gösterme butonu ve form -->
  </div>
</template>

<script>
import Blog from "../layouts/blog.vue";
import Swal from "sweetalert2";

export default {
  layout: "blog",
  // page component definitions
  components: { Blog },
  async asyncData({ params }) {
    const articleId = params.id;

    const articleList = JSON.parse(localStorage.getItem("articleList"));
    console.log("articleList: ", articleList);

    const article = articleList.find((element) => element.id == articleId);

    return { article };
  },
  data() {
    return {
      articleId: 0,
      showRemoveButton: false,
      showForm: false,
      updatedArticle: {
        title: "",
        description: "",
        img_url: "",
      },
    };
  },
  computed: {
    isArticleSaved() {
      const savedArticles =
        JSON.parse(localStorage.getItem("savedArticles")) || [];
      const articleList = JSON.parse(localStorage.getItem("articleList")) || [];
      const findedArtcileInList = articleList.find(
        (element) => element.id == this.$route.params.id
      );
      const findedArtcileInSaved = savedArticles.find(
        (element) => element.title == findedArtcileInList.title
      );
      if (findedArtcileInSaved) {
        this.showRemoveButton = true;
      }
      return this.showRemoveButton;
    },
  },
  methods: {
    async saveArticle() {
      const savedArticlesL =
        JSON.parse(localStorage.getItem("savedArticles")) || [];
      const articleList = JSON.parse(localStorage.getItem("articleList")) || [];

      const findedArtcileInList = articleList.find(
        (element) => element.id == this.$route.params.id
      );
      const findedArtcileInSaved = savedArticlesL.find(
        (element) => element.title == findedArtcileInList.title
      );

      if (!findedArtcileInSaved) {
        savedArticlesL.push(this.$route.params.id);
        Swal.fire("Hariikaa!", "Makaleniz okuma listenize eklendi!", "success");
        localStorage.setItem("savedArticles", JSON.stringify(savedArticlesL));
        this.$store.commit("updateSavedArticles", savedArticlesL);
      } else {
        Swal.fire("Oppss!", "Makalenizi zaten eklemiştiniz!", "error");
      }
      this.showRemoveButton = true;
    },
    removeArticle() {
      const savedArticles =
        JSON.parse(localStorage.getItem("savedArticles")) || [];
      const articleList = JSON.parse(localStorage.getItem("articleList")) || [];

      const articleIndex = savedArticles.indexOf(this.$route.params.id);
      if (!articleList.includes(this.$route.params.id)) {
        savedArticles.splice(articleIndex, 1);
        Swal.fire("Başarılı!", "Makale favorilerden çıkarıldı.", "success");
        localStorage.setItem("savedArticles", JSON.stringify(savedArticles));

        this.showRemoveButton = false;
      } else {
        Swal.fire("Hata!", "Makale favorilerinizde bulunmuyor.", "error");
      }
    },
    toggleForm() {
      this.showForm = !this.showForm;

      if (this.showForm) {
        this.updatedArticle.title = this.article.title;
        this.updatedArticle.description = this.article.description;
        this.updatedArticle.img_url = this.article.img_url;
      }
    },
    updateArticle() {
      const articleList = JSON.parse(localStorage.getItem("articleList"));
      const article = articleList.find(
        (element) => element.id == this.articleId
      );
      const filteredArticle = articleList.filter(
        (element) => !(element.id == this.articleId)
      );

      const lastArticle = {
        id: article.id,
        title: this.updatedArticle.title,
        description: this.updatedArticle.description,
        img_url: this.updatedArticle.img_url,
      };

      filteredArticle.push(lastArticle);

      localStorage.setItem("articleList", JSON.stringify(filteredArticle));

      this.article.title = this.updatedArticle.title;
      this.article.description = this.updatedArticle.description;
      this.article.img_url = this.updatedArticle.img_url;

      this.toggleForm();
    },
  },
  watch: {
    isArticleSaved(newVal) {
      this.showRemoveButton = newVal;
    },
  },
  mounted() {
    const currentUrl = window.location.href;
    const articleId = currentUrl.charAt(currentUrl.length - 1);
    console.log("currentUrl: ", articleId);
    this.articleId = articleId;
  },
};
</script>
