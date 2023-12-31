<template>
  <div class="main-container">
    <div class="heading">
      <h1 class="heading__title">
        Posts
      </h1>
    </div>
    <div class="cards">
      <div v-if="isLoading">Загрузка</div>
      <Card v-for="post in posts" :key="post.id" style="width: 25em">
        <template #header>
          <img alt="user header" :src="post.imageSrc">
        </template>
        <template #title>
          <h2>{{ post.title }}</h2>
        </template>
        <template #content>
          <p class="m-0">
            <strong>{{ post.description }}</strong>
          </p>
        </template>
        <template #footer>
          <NuxtLink :to="{ path: `/posts/${post.id}` }">
            <span class="text-sky-400 font-semibold">More</span>
          </NuxtLink>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import type { Post } from '~/@types/post';
import { usePostStore } from '~/stores/post';
const posts = ref<Array<Post>>([])
const isLoading = ref<boolean>(true);
onMounted(async () => {
  const postsStore = usePostStore();
  await postsStore.getAllPosts();
  posts.value = postsStore.posts;
  isLoading.value = false;
})

</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background-color: #eefbfc;
    color: #484848;
  }

  .main-container {
    max-width: 45vw;
    margin: auto;
    padding-top: 60px;
  }

  /* HEADING */

  .heading {
    text-align: center;
  }

  .heading__title {
    font-weight: 600;
    font-size: 40px;
  }

  .gradient__text {
    background: linear-gradient(to right, #7bceb6 10%, #12a87b 40%, #0FCF97 60%, #7bceb6 90%);
    background-size: 200% auto;
    color: #000;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 1s linear infinite;
  }

  @keyframes shine {
    to {
        background-position: 200% center;
    }
  }

  .heading__credits {
    color: #888888;
    font-size: 25px;
    transition: all 0.5s;
  }

  .heading__credits a {
    text-decoration: underline;
  }

  /* CARDS */
  .cards {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 30px;
  }

  .card {
    padding: 20px;
    width: 100%;
    min-height: 200px;
    display: grid;
    grid-template-rows: 20px 50px 1fr 50px;
    border-radius: 10px;
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.2s;
    cursor: default;
  }

  .card:hover {
    box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.4);
    transform: scale(1.01);
  }

  .card__link {
    position: relative;
    text-decoration: underline;
    color: rgba(255, 255, 255, 0.9);
  }

  .card__title {
    font-weight: 400;
    color: #ffffff;
    font-size: 30px;
  }

  .card__body {
    grid-row: 2/4;
  }

  .card__body p {
    color: #ffffff;
  }

  .card__action {
    grid-row: 5/6;
    align-self: center;
    display: flex;
    gap: 20px
  }

  /* RESPONSIVE */

  @media (max-width: 1600px) {
    .main-container {
        max-width: 100vw;
        padding: 50px;
    }

    .cards {
        justify-content: center;
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
  }

    .tailwind__card { background: radial-gradient(#7466e3, #5a4ad9); }
    .naiveui__card { background: radial-gradient(#ad6434, #995020); }
</style>
