<template>
<div class="counter">
	<div class="nums">
    <transition name="rotate" @after-enter="nextCount()">
		<span class="start" v-if="count>0" :key="count">{{count}}</span>
    </transition>
	</div>
</div>

</template>

<script lang="ts">
import { Vue,Options } from 'vue-class-component';

@Options({
  props: {
	start: Boolean,
	timer: Number
  },
  watch: {
    start() {
		if(this.start){
		this.count = this.timer;
		}
    }
  },
  emits: ['isOver']
})
export default class CountDown extends Vue {
	start=false;
	timer=10;
	count=0;

	nextCount(){
		this.count = (this.count>0?this.count-1:0)
		if(this.count<=0){
			this.$emit('isOver')
		}
	}
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
</style>
