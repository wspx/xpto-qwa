<template>
  <div>
    <Navbar />
    <CandidatoForm />
  </div>
</template>

<script>
import CandidatoForm from './components/CandidatoForm.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    CandidatoForm,
    Navbar
  },

}
</script>
