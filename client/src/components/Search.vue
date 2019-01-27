<template>
  <div class="search">
    <h1>Hva leter du etter</h1>
    <form @submit.prevent="handleSearch">
      <input class="input-field" v-model="search" type="text" @keyup="handleSearch">
      <button class="btn-submit">Submit</button>
    </form>
    <h3>Filtrer søket ditt:</h3>
    <div class="tags" v-if="tags">
      <h2>Emner</h2>
      <button
        v-for="(tag, i) in tags"
        :key="i"
        :class="{ 'active': tagged.includes(tag) }"
        @click="selectTag(tag)">
        {{ tag }}
        ({{ tag.length }})
      </button>
    </div>
    <div class="years" v-if="years.length > 0">
      <h2>Årstall</h2>
      <button
        v-for="y in years"
        :key="y.id"
        :class="{ 'active': yeared.includes(y) }"
        @click="selectYear(y)">
        {{ y }}
        ({{ years.length }})
      </button>
    </div>
    <div class="article-list">
      <ul v-if="articles">
        <li v-for="a in articles" :key="a.id">
          <h4>{{ a.title }}</h4>
          <p>{{ a.text }}</p>
          <span>REF: {{ a.id }},</span>
          <span>{{ a.author }}</span>
        </li>
      </ul>
    </diV>
    <!-- <p v-else>Venter på søk</p> -->
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
      this.yeared = []
    },
    selectTag(tag) {
      console.log("tag", tag)
      if(this.tagged.includes(tag)) {
        this.tagged = this.tagged.filter(tagInArray => tagInArray !== tag)
      } else {
         this.tagged.push(tag)
      }
      this.handleSearch()
    },
    selectYear(y) {
      console.log("year", y)
      if(this.yeared.includes(y)) {
        this.yeared = this.yeared.filter(yr => yr !== y)
      } else {
        this.yeared.push(y)
      }

      console.log(this.yeared)
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
      tagged: [],
      yeared: [],
    }
  },
  computed:{
    articles() {
      return this.$store.state.articles
    },
    tags() {
      return this.$store.state.tags
    },
    years() {
      return this.$store.getters.years // years er baser på article, getters
    },
    // yearCount() {
    //   return this.$store.getters.counts // count total
    // },
    // tagCount () {
    //   return this.tagged(tag).length
    // }
  }
}
</script>

<style scoped lang="scss">
.search {
  max-width: 600px;
  margin-top: 3rem;
  h1 {
    text-align: left;
  }
  .input-field {
    width: 60%;
    margin-bottom: 1rem;
    padding: 12px 45px;
    border: 3px solid #333;
    background-color: #f1f1f1;
    font-size: 20px;
  }
  .btn-submit {
   padding: 17px 10px;
   background-color: #333;
   color: #fff;
   right: 3px;
   bottom: 2px;
   border-radius: 0;
   position: relative;
   font-size: 16px;
  }
 .article-list {
   li {
     border-bottom: 2px solid #f1f1f1;
     padding: 1rem 0;
     list-style: none;
   }
 }


  .tags, .years{
    padding-bottom: 1rem;
    border-bottom: 2px solid #333;
    button {
      margin-right: 10px;
      padding: 4px 8px;
      border-radius: 8px;
      margin-bottom: .5rem;
      &.active {
        color: #333;
        border: 1px solid #0939A8;
        background-color: #f1f1f1;
      }
    }
  }
}

</style>