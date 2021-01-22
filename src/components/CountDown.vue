<template>
<div class="counter">
	<div class="nums">
    <transition name="rotate" @after-enter="count = (count>0?count-1:0)">
		<span class="start" v-if="count>=0" :key="count">{{count}}</span>
    </transition>
	</div>
	<h4>Get Ready</h4>
  <button @click="count = count-1">Toggle count</button>
</div>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class CountDown extends Vue {

show=true;
count=10;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.rotate-enter-to{
  animation: goIn 1s ease-in-out;
}

.rotate-leave-active {
  animation: goOut .5s ease-in-out;
}

.counter {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.nums {
	color: #3498db;
	position: relative;
	font-size: 50px;
	overflow: hidden;
	width: 250px;
	height: 50px;
}

.nums .start {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%) rotate(120deg);
	transform-origin: bottom center;
}

@keyframes goIn {
	0% {
		transform: translate(-50%, -50%) rotate(120deg);
	}
	30% {
		transform: translate(-50%, -50%) rotate(-20deg);
	}

	60% {
		transform: translate(-50%, -50%) rotate(10deg);
	}

	90%, 100% {
		transform: translate(-50%, -50%) rotate(0deg);
	}
}

@keyframes goOut {
	0%, 30% {
		transform: translate(-50%, -50%) rotate(0deg);
	}

	60% {
		transform: translate(-50%, -50%) rotate(20deg);
	}

	100% {
		transform: translate(-50%, -50%) rotate(-120deg);
	}
}

h4 {
	font-size: 20px;
	margin: 5px;
	text-transform: uppercase;
}
</style>
