<template>
  <div class="mb-4">
    <b-card tag="article" class="border-none shadow-md">
      <div class="w-full">
        <div class="article-image-container">
          <img
            :src="article?.img_url"
            :alt="article?.title"
            class="rounded-md article-image"
          />
        </div>
        <h5>{{ truncateTitle(article?.title, 40) }}</h5>
        <b-card-text class="mb-3 leading-relaxed text-gray-700">
          {{ truncateDescription(article?.description, 90) }}
        </b-card-text>
        <div class="flex justify-center gap-x-2">
          <nuxt-link :to="'/article-detail/' + article.id">
            <button
              class="text-bf-primary bg-bf-primary/20 hover:bg-bf-primary/60 rounded-md px-2.5 py-1.5 text-sm font-semibold"
            >
              Makaleyi Oku
            </button>
          </nuxt-link>
          <BFButton
            className="bg-bf-secondary/20 text-bf-secondary shadow-sm hover:bg-bf-secondary/40"
            :onClickHandler="deleteArticleHandler"
            title="Makaleyi Sil"
          />
        </div>
      </div>
    </b-card>
  </div>
</template>
<script>
import BFButton from "./BFButton.vue";

export default {
  props: {
    deleteArticle: {
      type: Function,
      required: true,
    },
    article: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    truncateDescription(description, limit) {
      if (description.length <= limit) {
        return description;
      } else {
        return description.slice(0, limit) + "...";
      }
    },
    deleteArticleHandler() {
      this.deleteArticle(this.article.id);
    },
    truncateTitle(title, limit) {
      if (title.length <= limit) {
        return title;
      } else {
        return title.slice(0, limit) + "...";
      }
    },
  },
  components: { BFButton },
  mounted() {
    console.log("articlearticlearticle: ", this.article);
  },
};
</script>

<style scoped>
.article-image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.b-card {
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.b-card-text {
  font-size: 16px;
}
</style>
