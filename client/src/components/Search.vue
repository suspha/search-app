 -0,0 +1,44 @@
<template>
  <div class="search">
    <h1>Search</h1>
    <form @submit.prevent="handleSearch">
      <input v-model="search" type="text" @keyup="handleSearch">
      <button>Submit</button>
    </form>
    <button @click="handleReset">Reset</button>
    <p>{{ search }}</p>
    <p v-if="result">{{ result }}</p>
    <p v-else>Venter på data</p>
    <ul v-if="result">
      <li v-for="r in result" :key="r.id">
        {{r.id}}: {{r.title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search',
  methods: {
    async handleSearch() {
      console.log(this.search)
      await this.$store.dispatch('doSearch', this.search)
    },
    handleReset() {
      this.$store.commit('setResult', null)
    }
  },
  data() {
    return {
      search: '',
    }
  },
  computed:{
    result() {
      return this.$store.state.result
    }
  }
}
</script>