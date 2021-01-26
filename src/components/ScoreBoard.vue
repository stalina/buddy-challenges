<template>
<h1>Your Score : {{scoreContext.score}}</h1>
<ul class="container">
  <li class="ellipsis">
    <p>
      ● ● ●
    </p>
  </li>
  <li class="item">
    <div class="avatar"></div>
    <div class="text">
      <h2>
        {{scoreContext.name}}
      </h2>
      <p>
        And a few words too.
      </p>
    </div>
    <div class="movement">
      <span>3</span>
    </div>
    <div class="rank">
      <span>{{scoreContext.score}}</span>
    </div>
  </li>
</ul>
</template>

<script lang="ts">
import { Options, Vue, setup } from 'vue-class-component';

import {useScore} from '@/composables/useScore'; 
import {playerStore} from '@/store/playerStore';

@Options({

})
export default class ScoreBoard extends Vue {
  scoreContext = setup(() => {
        const {score} = useScore();
        const name = playerStore.getPlayer().name;

        return {
            name,
            score
        };
    })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1{
  color: #fff;
}
.container {
  width: 80%;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  padding-inline-start: 0;
  position: fixed;
  overflow-y: scroll;
}


.ellipsis {
  line-height: 48px;
  list-style: none;
  text-align: center;
}

.item {
  background: #ddd;
  display: flex;
  height: 60px;
  margin: 2px 0;
  width: 100%;
  transition: width 0.6s ease;
}
.item:hover {
  width: 120%;
}

.avatar {
  background: #f80;
  position: relative;
  width: 60px;
  flex-shrink: 0;
}
.avatar::before {
  background: #fa0;
  border-radius: 50%;
  bottom: 12px;
  content: "";
  left: 12px;
  position: absolute;
  right: 12px;
  top: 12px;
}

.text {
  flex: 1;
  overflow: hidden;
  padding: 8px;
}
.text h2 {
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
}
.text p {
  font-size: 0.8em;
  line-height: 2em;
  margin: 0;
}

.movement {
  align-items: center;
  color: #0a8;
  display: flex;
  padding: 0 6px 0 2px;
  overflow: hidden;
}
.movement::before {
  content: "";
  border-bottom: 6px solid #0a8;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  margin-right: 4px;
}

.rank {
  align-items: center;
  background: #08f;
  color: #fff;
  display: flex;
  font-size: 2.4em;
  overflow: hidden;
  padding: 0 18px;
}
</style>
