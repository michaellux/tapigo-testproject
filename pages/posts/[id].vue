<template>
    <div class="main-container">
    <div class="heading">
       <div v-if="isLoading">Загрузка</div>
      <img :src="post?.imageSrc" alt="">
      <h1 class="heading__title">
        {{ post?.title }}
      </h1>
      <strong>{{ post?.description }}</strong>
      <p>
        {{ post?.content }}
      </p>

      <em>{{ post?.date }}</em>
    </div>
    <div class="post">
      
    </div>
  </div>

</template>

<script setup lang="ts">
import type { Post } from '~/@types/post';
import { usePostStore } from '~/stores/post';
const posts = ref<Array<Post>>([])
  const route = useRoute();
  const postsStore = usePostStore();
  let post = ref<Post>();
  const isLoading = ref<boolean>(true);
  onMounted(async() => {
    await postsStore.getAllPosts();
    posts.value = postsStore.posts;
    post.value = posts.value.filter((post: Post) => {
      return `${post.id}` === route.params.id 
    })[0];
    isLoading.value = false;
  });
</script>

<style lang="scss" scoped>

</style>
