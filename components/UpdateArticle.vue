<template>
  <div>
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
  </div>
</template>

<script>
export default {
  props: {
    showForm: {
      type: Boolean,
      required: true,
    },
    updateArticle: {
      type: Function,
      required: true,
    },
    updatedArticle: {
      type: Object,
      required: true,
    },
  },
};
</script>
