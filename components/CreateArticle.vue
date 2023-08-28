<template>
  <div class="px-2">
    <button
      @click="toggleForm"
      class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-bf-primary shadow-bf-night bg-bf-primary/20 hover:bg-bf-primary/40 my-3"
    >
      <span v-if="showForm">Kapat</span>
      <span v-else>Makale Ekle</span>
    </button>
    <b-form
      v-if="showForm"
      @submit.stop.prevent="saveArticle"
      class="absolute z-50 w-5/6 p-6 mb-4 bg-white rounded-md shadow-2xl shadow-bf-night"
    >
      <b-form-group label="Başlık">
        <b-form-input v-model="title" required></b-form-input>
      </b-form-group>

      <b-form-group label="Açıklama">
        <b-form-textarea v-model="description" required></b-form-textarea>
      </b-form-group>

      <b-form-group label="Resim URL">
        <b-form-input
          placeholder="Lütfen url giriniz"
          v-model="img_url"
          required
        ></b-form-input>
      </b-form-group>

      <button
        type="submit"
        class="w-full p-2 mt-4 duration-200 rounded-md shadow-2xl text-bf-primary bg-bf-primary/20 hover:bg-bf-primary hover:text-white"
      >
        Kaydet
      </button>
    </b-form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      id: 0,
      title: "",
      description: "",
      img_url: "",
      showForm: false,
    };
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },
    saveArticle() {
      const articleList = JSON.parse(localStorage.getItem("articleList")) || [];

      const newArticle = {
        id: articleList.length,
        title: this.title,
        description: this.description,
        img_url: this.img_url,
      };

      const existingArticles =
        JSON.parse(localStorage.getItem("myArticles")) || [];

      existingArticles.push(newArticle.id);

      localStorage.setItem("myArticles", JSON.stringify(existingArticles));

      articleList.push(newArticle);
      localStorage.setItem("articleList", JSON.stringify(articleList));

      this.$store.commit("updateArticleList", articleList);
      Swal.fire("Hariikaa!", "Makaleniz başarıyla kaydedildi!", "success");

      this.title = "";
      this.description = "";
      this.img_url = "";
      this.showForm = false;
    },
  },
};
</script>

<style scoped>
.btn-primary {
  background-color: #3182ce;
  border-color: #3182ce;
}

.btn-primary:hover {
  background-color: #2a69ac;
  border-color: #2a69ac;
}
</style>
