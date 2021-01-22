<template>
  <div>
    <LightSaber :isSaberActive="gameStarted" />
    <GameStarter :isOpen="openStarter && !gameStarted" @game-started="gameStarted=true;openStarter=false"> 
      <h1>Light Saber</h1>
      <p>Shake your device as fast as you can during 10s to make the light grow</p>
      <p> if your device does not support shaking, alternatively, you can click on the saber handle</p>
    </GameStarter>
    <CountDown :start="gameStarted" :timer="10" @is-over="gameOver()"></CountDown>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LightSaber from '@/components/LightSaber.vue'; 
import GameStarter from '@/components/GameStarter.vue'; 
import CountDown from '@/components/CountDown.vue'; 

@Options({
  components: {
    LightSaber, GameStarter, CountDown
  }
})
export default class ShakerGame extends Vue {

  openStarter = false;
  gameStarted = false;

  mounted(){
    this.openStarter=true;
  }

  gameOver(){
    this.gameStarted=false;
  }
}
</script>
