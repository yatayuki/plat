<template>
  <v-app>
    <v-img
      src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-9/49025949_2136308929789220_1693793277427318784_o.jpg?_nc_cat=102&_nc_sid=825194&_nc_oc=AQmAYc7FzWlxZW2cUj1K0hXkSu24hizDOObaB3P_vg9KwJydxLo8Nr9RrUO-5vIdXO8Uv8n9U2GbEBrpANudVNjk&_nc_ht=scontent-nrt1-1.xx&oh=e2d44fb46ecc1800d99aa4f680886b2d&oe=5E9FD6D2"
      max-height="250"
      to="/"
    >
      <!-- <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        height="80"
        width="80"
        elevation="6"
        class="mt-5 ml-5"
      /> -->
    </v-img>
    <!-- <v-navigation-drawer
      v-model="drawer"
      absolute
      width="350"
      bottom
      temporary
    >
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>箕輪編集室</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn width="300" class="mx-auto my-2" href="/">
              TOP
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              エンジニアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              デザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              PRチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              学生チーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              ライターチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              メディアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              イベントプロデュースチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              コミュニティデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              キャリアデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              神社プロデュースチーム
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>マイプロジェクト</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn width="300" class="mx-auto my-2">
              箕輪編集室
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              エンジニアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              デザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              PRチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              学生チーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              ライターチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              メディアチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              イベントプロデュースチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              コミュニティデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              キャリアデザインチーム
            </v-btn>
            <v-btn width="300" class="mx-auto my-2">
              神社プロデュースチーム
            </v-btn>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer> -->
    <v-container>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          sm="11"
          md="10"
          xl="8"
        >
          <breadcrumbs />
          <scroll />
          <h1 class="font-weight-thin text--disabled">
            {{ tag.fields.name }}
          </h1>
          <v-row v-if="relatedPosts.length">
            <v-col
              v-for="(post, i) in relatedPosts"
              :key="i"
              cols="12"
              sm="6"
              lg="4"
              xl="3"
            >
              <v-card
                max-width="500"
                class="mx-auto"
              >
                <v-img
                  :src="post.fields.image.fields.file.url"
                  :alt="post.fields.image.fields.title"
                  :aspect-ratio="16/9"
                  max-height="200"
                >
                  <v-card-text>
                    <v-chip
                      :color="categoryColor(post.fields.category)"
                      :to="linkTo('categories',post.fields.category)"
                      small
                      dark
                      class="font-weight-bold"
                    >
                      {{ post.fields.category.fields.name }}
                    </v-chip>
                  </v-card-text>
                </v-img>
                <v-row>
                  <v-btn
                    @click.stop="onClickBtn(post)"
                    color="accent"
                    text
                    class="ml-6 my-1"
                  >
                    ABOUT
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    :href="post.fields.url"
                    color="accent"
                    text
                    class="mr-6 my-1"
                  >
                    Jump
                  </v-btn>
                </v-row>
              </v-card>
            </v-col>
            <v-dialog
              v-model="dialog"
              v-if="currentBook"
              max-width="700"
              activator
            >
              <v-card>
                <v-img
                  :src="currentBook.fields.image.fields.file.url"
                  :alt="currentBook.fields.image.fields.title"
                  :aspect-ratio="16/9"
                >
                </v-img>
                <v-col>
                  <template v-if="currentBook.fields.tags">
                    <v-chip
                      v-for="(tag) in currentBook.fields.tags"
                      :key="tag.sys.id"
                      :to="linkTo('tags', tag)"
                      small
                      outlined
                      label
                      class="ml-3 my-3"
                    >
                      <v-icon
                        left
                        size="18"
                        color="grey"
                      >
                        mdi-label
                      </v-icon>
                      {{ tag.fields.name }}
                    </v-chip>
                  </template>
                </v-col>
                <v-card-text>
                  {{ currentBook.fields.body }}
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    :href="currentBook.fields.url"
                    text
                    color="primary"
                    class="mr-3"
                  >
                    JUMP
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    @click="dialog = false"
                    color="green darken-1"
                    text
                    class="mr-3"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <div v-else class="text-center">
            投稿された記事はありません。
          </div>
    </v-col>
  </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import client from '~/plugins/contentful'
export default {
  async asyncData ({ payload, params, error, store, env }) {
    let tag = payload
    if (!tag) {
      for (let i = 0; i < store.state.posts.length; i++) {
        const tags = store.state.posts[i].fields.tags
        if (tags) { tag = tags.find(tag => tag.fields.slug === params.slug) }
        if (tag) { break }
      }
    }
    if (tag) {
      const relatedPosts = await client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.tags.sys.id': tag.sys.id
      }).then(res => res.items).catch(console.error)
      return { tag, relatedPosts }
    } else {
      error({ statusCode: 400 })
    }
  },
  data () {
    return {
      dialog: false,
      drawer: false,
      currentBook: null,
      group: null
    }
  },
  computed: {
    ...mapState(['posts']),
    ...mapGetters(['setEyeCatch', 'draftChip', 'linkTo']),
    categoryColor () {
      return (category) => {
        switch (category.fields.name) {
          case 'イベント・ミーティング': return '#C73A31'
          case '自己紹介・雑談等': return '#236244'
          case 'お知らせ': return 'primary'
          case '作品制作・プロジェクト': return '#0e2b3c'
          case '講座・勉強会': return '#aa00aa'
          case '質問・アンケート': return '#aaaa00'
          default: return '#333'
        }
      }
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  methods: {
    onClickBtn (post) {
      this.currentBook = post
      this.dialog = true
    }
  }
}
</script>
