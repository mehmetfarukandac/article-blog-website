<template>
  <div class="bg-bf-dark">
    <b-navbar type="light" class="px-4 py-2">
      <b-navbar-nav class="mx-auto gap-x-4">
        <b-nav-item href="/" class="transition rounded-md duration-600">
          <span
            class="text-lg font-semibold text-bf-white/60 hover:text-bf-white"
            >Anasayfa</span
          >
        </b-nav-item>
        <b-nav-item
          href="/saved-articles"
          class="transition rounded-md duration-600"
        >
          <span
            class="text-lg font-semibold text-bf-white/60 hover:text-bf-white"
            >Favorilerim</span
          >
        </b-nav-item>
        <b-nav-item
          href="/my-articles"
          class="transition rounded-md duration-600"
        >
          <span
            class="text-lg font-semibold text-bf-white/60 hover:text-bf-white"
            >Makalelerim</span
          >
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
