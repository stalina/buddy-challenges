import { ref, Ref, readonly } from 'vue'; 

interface Player extends Object {
    name: string;
}

class PlayerStore {
    protected player: Ref<Player>;

    constructor() {
        this.player = ref({name:''});
    }
    setPlayerName(name: string){
        this.player.value.name = name;
    }
    getPlayer(){
        return readonly(this.player.value)
    }
}

export const playerStore: PlayerStore = new PlayerStore();