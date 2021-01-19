<template>
  <div>
    <LightSaber />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LightSaber from '@/components/LightSaber.vue'; // @ is an alias to /src

@Options({
  components: {
    LightSaber,
  },
})
export default class ShakerGame extends Vue {

}
</script>
