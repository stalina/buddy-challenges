<template>
<div id="lightsaber">
    <span id="light" v-bind:style="laserStyle"></span>
    <span id="generator" @click="increment">
        <span id="guard">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </span>
        <span id="handlestart">
            <span></span>
            <span></span>
        </span>
        <span id="handle">
            <span></span>
            <span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span></span><span></span>
            <span class="long"></span>
            <span class="long"></span>
            <span class="box"></span>
        </span>
        <span class="wings">
            <span class="wing wing1"></span>
            <span class="wing wing2"></span>
            <span class="wing wing3"></span>
        </span>

        <span class="light"></span>
    </span>
</div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class LightSaber extends Vue {
    count=0
    laserStyle={ height: '0px' }

    hasDeviceMotion = false
    lastTime = new Date()
    lastX: number|null = null
    lastY: number|null = null
    lastZ: number|null = null
    options = {
                threshold: 15, //default velocity threshold for shake to register
                timeout: 250 //default interval between events
            };

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
        
        const elt = document.getElementById('generator');
        if(elt){
            const maxHeight = elt.getBoundingClientRect().top;
            const height = (this.count>100?1:this.count/100) * maxHeight
            this.laserStyle = { height: height + 'px' }
        }
    }
    
    increment(){
        this.shakeIt();
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#lightsaber {
    width:50px;
    margin:auto;
    line-height:0;
    text-align:center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
}
#lightsaber span { display:inline-block; }

#light {
    position:relative;
    width:14px;
    background:#fff;
    border-radius:7px 7px 2px 2px;
    box-shadow:0 0 5px #fff,0 0 8px #fff,0 0 12px #fff,0 0 15px blue,0 0 25px blue;
    z-index:5;
    -webkit-transition: all 1s;
    -moz-transition: all 1s;
    transition: all 1s;
}
#generator {
    position:relative;
    top:-3px;
    width:45px;
    height:170px;
    z-index:0;
}
#guard { width: 100%; }
#guard span,
#handlestart span,
#handle span:nth-child(2n+1),
#handle .long + .long {
    width: 100%;
    height: 3px;
    background-color: #fff;
    background-image: -webkit-linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.65) 100%);
    background-image: -moz-linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.65) 100%);
    background-image: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.7) 10%, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0.75) 85%, rgba(0,0,0,0.65) 100%);
    box-shadow: 0 1px 1px rgba(0,0,0,0.4) inset,0 -1px 1px rgba(255,255,255,0.4) inset;
    border-radius: 0 0 2px 2px;
}
#guard span + span {
    width: 82%;
    height: 6px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4) inset,0 -1px 2px rgba(255,255,255,0.4) inset;
}
#guard span + span + span {
    width: 76%;
    height: 9px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.4) inset,0 -1px 2px rgba(255,255,255,0.4) inset;
}
#guard span + span +span + span {
    width: 65%;
    height: 6px;
}
#guard span + span +span + span + span {
    width: 40%;
    height: 10px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.4) inset,0 -1px 2px rgba(0,0,0,0.4) inset;
}

#handlestart { width: 100%; }
#handlestart span {
    width: 90%;
    height: 6px;
    border-radius: 50% 50% 0 0;
}
#handlestart span + span {
    width: 75%;
    height: 4px;
}

#handle { width: 77%; }
#handle span:nth-child(2n+1) {
    width: 95%;
}
#handle span:first-child {
    width: 50%;
    height: 7px;
    background: -webkit-linear-gradient(to right, #000, #333 58%, #000 85%, #000);
    background: -moz-linear-gradient(to right, #000, #333 58%, #000 85%, #000);
    background: linear-gradient(to right, #000, #333 58%, #000 85%, #000);
    box-shadow: 0 0 0;
}
#handle span:first-child + span,
#handle span:nth-child(2n+2) {
    width: 75%;
    height: 6px;
    background: -webkit-linear-gradient(to right, #000, #333 58%, #000 85%, #000);
    background: -moz-linear-gradient(to right, #000, #333 58%, #000 85%, #000);
    background: linear-gradient(to right, #000, #333 58%, #000 85%, #000);
    border-radius: 3px 3px 0 0;
}
#handle span:nth-child(2n+2) {
    width: 100%;
    height: 4px;
    border-radius: 0;
}
#handle span.long,
#handle .long + .long {
    height: 35px;
    border-radius: 0;
    box-shadow: 0 -1px 2px rgba(0,0,0,0.5) inset, 0 -1px 5px rgba(0,0,0,0.5) inset;
}
#handle .long + .long {
    height: 30px;
    width: 100%;
    background-position: 2px 0;
}
#handle span.box {
    position: absolute;
    top:121px;left:50%;
    height: 28px;
    width: 24px;
    margin-left:-12px;
    background: -moz-linear-gradient(#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15,#4b3222,#2c1e15);
    box-shadow: 0 0 10px rgba(0,0,0,0.9) inset, 0 3px 3px -3px rgba(0,0,0,1);
    z-index: 5;
}

.light { 
    position: absolute;
    left: 12px; top:0; bottom:-12px; right:12px;
    background: rgba(0, 0, 255, 0.05);
    box-shadow: 0 0 12px rgba(0, 0, 255, 0.2);
    -webkit-transition: all .8s;
    -moz-transition: all .8s;
    transition: all .8s;
}

.wings {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 30px;
}
.wing {
    position: absolute;
    background: #4B3222;
    width: 12px;
    height: 16px;
    bottom: 100%;
    box-shadow: 0 0 14px rgba(0,0,0,0.3) inset, 0 0 6px rgba(0,0,0,0.3) inset;
}
.wing:before {
    position: absolute;
    content: "";
    top: -15px; left: 0;
    height: 10px;
    width: 0;
    border-left:12px #312116 solid;
    border-right:5px transparent solid;
    border-top:5px transparent solid;
}
.wing1 {
    right: -6px;
}
.wing2 {
    right: 50%;
    margin-right: -2px;
    width: 4px;
}
.wing2:before {
    height: 14px;
    width: 4px;
    top: -14px;
    background: #312116;
    border: 0 none;
}
.wing3 {
    left: -6px;
}
.wing3:before {
    border-right:12px #312116 solid;
    border-left:0 none;
}
</style>