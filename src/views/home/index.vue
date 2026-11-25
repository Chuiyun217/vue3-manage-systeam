<script setup>
import { ref } from 'vue'

import vHeader from '@/components/v-header/v-header.vue'

let str = ref('123')
let ojb = ref({
  name: '1',
  age: '12',
})
console.log('[ str ] => ', str.value)
console.log('[ ojb ] => ', ojb.value.age)
</script>
<template>
  <v-header />
</template>
<style></style>
