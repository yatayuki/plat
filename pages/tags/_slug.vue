<template>
  <div>
    <v-img
      src="https://scontent-nrt1-1.xx.fbcdn.net/v/t1.0-9/49442049_2136301306456649_298560287894667264_o.jpg?_nc_cat=110&_nc_oc=AQm6SjyaXB34cG_zdLx5Rjuk7CQAXyr58Z3aMAGzJl1DIXZB1Of2MDH4kvU0-XyVTEKNOFVRFe6z2rOIb-vMisPO&_nc_ht=scontent-nrt1-1.xx&oh=b49d0781ed640818ae9d70e2c4e43499&oe=5EBAF5BD"
      max-height="250"
      to="/"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        height="80"
        width="80"
        elevation="6"
        class="mt-5 ml-5"
      />
    </v-img>
    <v-navigation-drawer
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
    </v-navigation-drawer>
    <v-row
      justify="center"
    >
    <v-col
      cols="12"
      sm="11"
      md="10"
      xl="8"
    >
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
    </v-row>
  </v-col>
</v-row>
  </div>
</template>

<script>
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
      drawer: false
    }
  },
  computed: {
    categoryColor () {
      return (category) => {
        switch (category.fields.name) {
          case 'イベント・ミーティング': return '#C73A31'
          case '自己紹介・雑談等': return '#236244'
          case 'お知らせ': return 'primary'
          case '作品制作・プロジェクト': return '#0e2b3c'
          case '講座・勉強会': return '#aa00aa'
          case '質問・アンケート': return '#aaaa00'
          default: return '#777'
        }
      }
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>
