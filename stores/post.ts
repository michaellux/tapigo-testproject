import { defineStore } from 'pinia'
import type { Json } from '~/@types/common'
import type { Post } from '~/@types/post'

interface PostsStore {
 posts: Array<Post>
}

export const usePostStore = defineStore('post', {
  state: (): PostsStore => ({
    posts: [],
  }),
  actions: {
    async getAllPosts () {
      console.log("getallposts");
      const response = await fetch('https://api.slingacademy.com/v1/sample-data/blog-posts')
      const data = await response.json()
      console.log(data)
      data.blogs.forEach((dataitem: Json, index: number) => {
        const post: Post = {
          id: ++index,
          imageSrc: dataitem.photo_url,
          title: dataitem.title,
          date: new Date(dataitem.created_at).toDateString(),
          description: dataitem.description,
          content: dataitem.content_text
        }
        this.posts = [...this.posts, post];
      })
    }
  }
})
