<template>
  <div>
    <LightSaber />
    <CountDown />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LightSaber from '@/components/LightSaber.vue'; // @ is an alias to /src
import CountDown from '@/components/CountDown.vue'; // @ is an alias to /src

@Options({
  components: {
    LightSaber, CountDown
  },
})
export default class ShakerGame extends Vue {

}
</script>
