<template>
  <div class="centered">
    <h1> Buddy Challenge </h1>
    <nav>
      <ul>
        <li class="ellipsis"><h2>Enter your Pseudo :</h2></li>
        <li class="ellipsis"><input v-model="name" @change="setName()" /></li>
        <li v-if="name" class="ellipsis">
            ● ● ●
        </li>
        <li v-if="name" class="menu"><router-link to="/shaker">Play Solo</router-link></li>
        <li v-if="name" class="menu"><a href="#">Host Challenge</a></li>
        <li v-if="name" class="menu"><a href="#">Join Challenge</a></li>
        <li v-if="name" class="ellipsis">
            ● ● ●
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import {Vue } from 'vue-class-component';
import {playerStore} from '@/store/playerStore';

export default class Home extends Vue {
  name = playerStore.getPlayer().name

  setName(){
    playerStore.setPlayerName(this.name);
  }

}
</script>
<style scoped lang="scss">

.ellipsis {
  line-height: 48px;
  list-style: none;
  text-align: center;
  color: #fff;
    input {
      width:100%;
      height: 3em;
      text-transform:uppercase;
      background:rgba(255, 255, 255, .8);
      text-align:center;
      border-radius:.75em;
      box-shadow:
          .1em -.1em 0 .1em rgba(0, 0, 0, .2),
          inset 0 0 0 .15em rgba(0, 0, 0, .4),
          -.1em .1em 0 .1em rgba(0, 0, 0, .2)
        ;
    }
}
.centered{
    width: 80%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

nav {
    
    width: 100%;
    ul {
      width:100%;
      list-style:none;
      padding:0 .5em; 
    
      > li.menu {
        position:relative;
        float:left;
        width:100%;
        padding:.45em .25em;
        margin:0 0 .55em 0;
    
        text-transform:uppercase;
        cursor:pointer;
        background:rgba(255, 255, 255, .8);
        text-align:center;
        border-radius:.75em;
        transition-duration: .3s;
        transition-timing-function: ease-in-out;
        transition-property: background, color, padding, border-radius;
        box-shadow:
          .1em -.1em 0 .1em rgba(0, 0, 0, .2),
          inset 0 0 0 .15em rgba(0, 0, 0, .4),
          -.1em .1em 0 .1em rgba(0, 0, 0, .2)
        ;
    
        &:after {
          position:absolute;
          z-index:-1;
          content:"";
          right:0;
          border-radius:50%; 
          box-shadow:
            1em 1em 0 2em rgba(255, 255, 255, .5)
          ;
        }

        &:last-child:after {
           box-shadow:none;
        }
    
        &:hover {
            background-color:rgba(251, 93, 0, .8);
    
            > a {
              color:#fff;
            }
        }
    
        > a {
          color:#333;
          text-decoration:none;
          font-size: 1.4em;
          transition:color .3s ease-in-out;
        }
      }
    }
}


</style>
