<template>
  <div>
    <button
      href="#"
      :class="className + ' rounded-md  px-2.5 py-1.5 text-sm font-semibold '"
      @click="onClickHandler() && onClickHandler()"
    >
      {{ title }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    onClickHandler: {
      type: Function,
      required: false,
    },
  },
};
</script>
