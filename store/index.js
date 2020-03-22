import client from '~/plugins/contentful'// 追記

// 追記
export const state = () => ({
  posts: []
})

export const getters = {

  linkTo: () => (name, obj) => {
    return { name: `${name}-slug`, params: { slug: obj.fields.slug } }
  }
}

export const mutations = {
  setPosts (state, payload) {
    state.posts = payload
  }

}
export const actions = {
  async getPosts ({ commit }) {
    await client.getEntries({
      content_type: process.env.CTF_BLOG_POST_TYPE_ID,
      order: '-fields.publishDate' // desc
    }).then(res =>
      commit('setPosts', res.items)
    ).catch(console.error)
  }

}
