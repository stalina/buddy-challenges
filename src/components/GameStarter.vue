<template>


<div class="overlay-message" :class="{'is-open': isOpen}">
	<div class="instruction" v-if="state==='instruction'">
		<slot></slot>
		<button class="overlay-close" @click="state='countdown'">I am ready !</button>
	</div>
	<CountDown :start="state==='countdown'" :timer="3" @is-over="state='started'"></CountDown>
	<div class="started" v-if="state==='started'">Go !!!</div>
</div>

<div class="overlay overlay01" :class="{'is-open': isOpen}"></div>

</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import CountDown from '@/components/CountDown.vue'; 
@Options({
  components: {
    CountDown
  },
  props: {
    isOpen: Boolean
  }
})
export default class GameStarter extends Vue {
	isOpen=false;
	state='instruction';
}
</script>

<style scoped lang="scss">
.overlay-message {
	color: #fff;
	position: fixed;
	top: 50%;
	left: 50%;
	z-index: 10;
	opacity: 0;
	visibility: hidden;
	transition: .2s ease-in-out;
	transform: translate(-50%, -50%);
}
.overlay-message.is-open {
  opacity: 1;
  visibility: visible;
}
.overlay-close {
  
  padding: 1em 2.5em;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #222;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.overlay-close:hover {
  background: transparent;
  color: #fff;
}

.overlay01 {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);
  opacity: 0;
  visibility: hidden;
  transition: .3s linear;
}
.overlay01.is-open {
  opacity: 1;
  visibility: visible;
}
.started{
	text-shadow: 1px 1px 1px #2f00ff,
             2px 2px 1px #2f00ff;
	font-size: 300%;
	font-weight: bolder;
	animation: .8s shake infinite alternate;
}
@keyframes shake {
  0% { transform: skewX(-15deg); }
  5% { transform: skewX(15deg); }
  10% { transform: skewX(-15deg); }
  15% { transform: skewX(15deg); }
  20% { transform: skewX(0deg); }
  100% { transform: skewX(0deg); }  
}
</style>
