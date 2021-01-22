<template>
  <div>
    <LightSaber />
    <GameStarter :isOpen="openStarter"> 
      <h1>Light Saber</h1>
      <p>Shake your device as fast as you can during 10s to make the light grow</p>
      <p> if your device does not support shaking, alternatively, you can click on the saber handle</p>
    </GameStarter>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LightSaber from '@/components/LightSaber.vue'; // @ is an alias to /src
import GameStarter from '@/components/GameStarter.vue'; // @ is an alias to /src

@Options({
  components: {
    LightSaber, GameStarter
  }
})
export default class ShakerGame extends Vue {

  openStarter = false;

  mounted(){
    this.openStarter=true;
  }
}
</script>
