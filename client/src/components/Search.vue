<template>
  <div class="search">
    <h1>Search</h1>
    <form @submit.prevent="handleSearch">
      <input v-model="search" type="text" @keyup="handleSearch">
      <button>Submit</button>
    </form>
    <div class="tags" v-if="tags">
      <button
        v-for="(tag, i) in tags"
        :key="i"
        :class="{ 'active': tagged.includes(tag) }"
        @click="selectTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <ul v-if="articles">
      <li v-for="a in articles" :key="a.id">
        {{ a.id }}: {{ a.title }}
      </li>
    </ul>
    <p v-else>Venter på søk</p>
  </div>
</template>

<script>
export default {
  name: 'search',
  methods: {
    handleSearch() {
      if(this.search.length > 1 ) {
        console.log(this.search)
        this.$store.dispatch('doSearch', this)
      } else {
        this.handleReset()
      }
    },
    handleReset() {
      this.$store.commit('setArticles', null)
    },
    selectTag(tag) {
      console.log("tag", tag)
      if(this.tagged.includes(tag)){
        this.tagged = this.tagged.filter(tagInArray => tagInArray !== tag)
      } else {
         this.tagged.push(tag)
      }
      this.handleSearch()
    }
  },
  created() {
    this.$store.dispatch('loadTags')
    console.log('created')
  },
  data() {
    return {
      search: '',
      tagged: []
    }
  },
  computed:{
    articles() {
      return this.$store.state.articles
    },
    tags() {
      return this.$store.state.tags
    }
  }
}
</script>

<style scoped lang="scss">
.tags{
  button {
    &.active {
      color: #fff;
      background-color: green;
    }
  }
}

</style>