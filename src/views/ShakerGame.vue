<template>
  <div>
    <LightSaber v-bind:percentProp="count/100" />
    Counter o:o {{ count/100 }}
    <button @click="increment">test</button>
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

  hasDeviceMotion = false
  lastTime = new Date()
  lastX: number|null = null
  lastY: number|null = null
  lastZ: number|null = null
  options = {
            threshold: 15, //default velocity threshold for shake to register
            timeout: 250 //default interval between events
        };
  count=50

  increment(){
    this.shakeIt();
  }

  created() {
    console.log('created light');
    this.hasDeviceMotion = 'ondevicemotion' in window;
    if(!this.hasDeviceMotion){
      console.log('not supported');
    }else {
      this.start();
    }
  }

  unmounted() {
    console.log('unmountes light');
  }

  start() {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this.devicemotion, false);
        }
    }

  reset() {
      this.lastTime = new Date();
      this.lastX = null;
      this.lastY = null;
      this.lastZ = null;
  }

  devicemotion(e: DeviceMotionEvent) {
        let currentTime;
        let timeDifference;
        let deltaX = 0;
        let deltaY = 0;
        let deltaZ = 0;
        const current = e.accelerationIncludingGravity? 
          {x:e.accelerationIncludingGravity.x||0, y:e.accelerationIncludingGravity.y||0, z:e.accelerationIncludingGravity.z||0}:{x:0, y:0, z:0}


        if (this.lastX === null || this.lastY === null || this.lastZ === null) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX||0 - current.x);
        deltaY = Math.abs(this.lastY||0 - current.y);
        deltaZ = Math.abs(this.lastZ||0 - current.z);

        if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > this.options.timeout) {
                this.shakeIt();
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

    }

    shakeIt(){
      this.count++;
    }

}
</script>
