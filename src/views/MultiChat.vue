<template>
  <div id="login" v-if="screen === 'login'">
                <div class="container">
                    <h1>Enter your username</h1>
        
                    <div class="row">
                        <form v-on:submit="submitLogin">
                            <div class="input-field col s8">
                                <input :disabled="loading" id="username" type="text" v-model="usernameInput" />
                                <label for="username">My username</label>
                            </div>
                            <button v-bind:class="{ disabled: loading }" class="btn-large waves-effect waves-light red col s4" type="submit">
                                Login<i class="material-icons right">login</i>
                            </button>
                        </form>
                    </div>

                    <p v-if="loading">Loading...</p>
                    <p v-if="peerError" style="color: red">{{ peerError }}</p>
                    <p>Crafted with &#10084; <em>by <a href="https://r.milon.pro" target="_blank" rel="noopener noreferrer">Rubilmax</a></em></p>
                </div>
            </div>
            <div id="chat" v-if="screen === 'chat'">
                <div class="container">
                    <h1>Multichat</h1>
                    <p>Crafted with &#10084; <em>by <a href="https://r.milon.pro" target="_blank" rel="noopener noreferrer">Rubilmax</a></em></p>
                    <p>Your username: {{ usernameInput }}</p>
                </div>

                <div class="row">
                    <div id="users" class="col s12 m5">
                        <div class="row">
                            <!-- We don't show connection form if the client is disconnected -->
                            <div v-if="!peer.disconnected">
                                <form v-on:submit="submitConnection">
                                    <div class="input-field col s8">
                                        <input :disabled="loading" id="target_id" type="text" v-model="targetIdInput" />
                                        <label for="target_id">Target username</label>
                                    </div>
                                    <button v-bind:class="{ disabled: loading }" class="btn-large waves-effect waves-light col s4" type="submit">
                                        Connect<i class="material-icons right">login</i>
                                    </button>
                                </form>
    
                                <button class="btn-large waves-effect waves-light red col s12" v-on:click="disconnectPeer">
                                    Disconnect from server<i class="material-icons right">logout</i>
                                </button>
    
                                <div class="col s12">
                                    <em v-if="peerError" style="color: red">{{ peerError }}</em>
                                </div>
                            </div>
                            <div v-else class="container">
                                <h5>You are disconnected!</h5>
                                <em>You can still talk to connected users, but won't be able to reach or be reached by any new user!</em>
                            </div>

                            <div class="col s12">
                                <h4>Connected users</h4>
                                <p><i class="material-icons">portrait</i>{{ usernameInput }}</p>
                                <!-- TO REPLACE -->
                            </div>
                        </div>
                    </div>

                    <div class="col s12 m7">
                        <h4>Chatbox</h4>
                        <div id="chatbox">
                            <!-- TO REPLACE -->
                        </div>
                        <div class="row">
                            <form v-on:submit="submitChat">
                                <div class="input-field col s10">
                                    <input id="chat_message" type="text" v-model="chatMessageInput" />
                                    <label for="chat_message">Your message</label>
                                </div>
                                <button class="btn-floating btn-large waves-effect waves-light red" type="submit">
                                    <i class="material-icons">send</i>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Peer from 'peerjs'

const appPrefix = "secure-p2p-multichat-"; // the prefix we will preprend to usernames

        const oldChats = localStorage.getItem("chats");
        const chats = oldChats ? JSON.parse(oldChats) : []; // oldChats may be undefined, which throws error if passed into JSON.parse

@Options({

})
export default class MultiChat extends Vue {
    screen= "login" // initialize at login screen
    usernameInput= localStorage.getItem("username") // to load saved username
    peerError= ""
    loading= false
    peer: Peer|null = null// initialize as empty object instead of undefined
    targetIdInput= ""
    peerIds: string[]=[] // connected to nobody at first
    connections: Map<string, Peer.DataConnection|undefined> = new Map()// maps peerIds to their correspondig PeerJS's DataConnection|undefined objects
    chats: any[]=[]
    chatMessageInput= ""

    // util functions to convert username to peer ids and vice-versa
                getPeerId(username: string){
                  this.peer?.connect
                  return appPrefix + username
                } 

                getUsername(peerId: string) {
                  return peerId ? peerId.slice(appPrefix.length) : ""
                }

                // we keep track of connections ourselves as suggested in peerjs's documentation
                addConnection(conn: Peer.DataConnection|undefined) {
                  if(conn){
                    this.connections.set(conn.peer, conn);
                    this.updatePeerIds();

                    console.log(`Connected to ${conn?.peer}!`);
                  }
                }

                removeConnection(conn: Peer.DataConnection|undefined) {
                  if(conn){
                   this.connections.delete(conn?.peer);
                    this.updatePeerIds();
                  }
                }

                updatePeerIds() {
                    this.peerIds = [ ...this.connections.keys()]
                }

                disconnectPeer() {
                    this.peer?.disconnect();
                }

                // called to properly configure connection's client listeners
                configureConnection(conn: Peer.DataConnection|undefined) {
                    conn?.on("data", data => {
                        // if data is about connections (the list of peers sent when connected)
                        if (data.type === "connections") {
                            data.peerIds.forEach((peerId: string) => {
                                if (!this.connections.get(peerId)) {
                                    this.initiateConnection(peerId);
                                }
                            });
                        } else if (data.type === "chat") {
                            this.receiveChat(data.chat);
                        }
                        // please note here that if data.type is undefined, this endpoint won't do anything!
                    });
                    conn?.on("close", () => this.removeConnection(conn));
                    conn?.on("error", () => this.removeConnection(conn));

                    // if the caller joins have a call, we merge calls
                    conn?.metadata.peerIds.forEach((peerId: string) => {
                        if (!this.connections.get(peerId)) {
                            this.initiateConnection(peerId);
                        }
                    });
                }
                // called to initiate a connection (by the caller)
                initiateConnection(peerId: string) {
                    if (!this.peerIds.includes(peerId) && peerId !== this.peer?.id) {
                        this.loading = true;
                        this.peerError = "";

                        console.log(`Connecting to ${peerId}...`);

                        const options = {
                            metadata: {
                                // if the caller has peers, we send them to merge calls
                                peerIds: this.peerIds
                            },
                            serialization: "json"
                        };
                        const conn = this.peer?.connect(peerId, options);
                        this.configureConnection(conn);

                        conn?.on("open", () => {
                            this.addConnection(conn);
                            if (this.getUsername(conn.peer) === this.targetIdInput) {
                                this.targetIdInput = "";
                                this.loading = false;
                            }
                        });
                    }
                }
                createPeer() {
                  if(this.usernameInput){
                    // options are useful in development to connect to local peerjs server
                    this.peer = new Peer(this.getPeerId(this.usernameInput)/*, {
                        host: 'localhost',
                        port: 8080,
                        path: 'app'
                    }*/);

                    // when peer is connected to signaling server
                    this.peer.on("open", () => {
                        this.screen = "chat"; // changing screen
                        this.loading = false;
                        this.peerError = "";
                    });
                    // error listener
                    this.peer.on("error", error => {
                        if (error.type === "peer-unavailable") { // if connection with new peer can't be established
                            this.loading = false;
                            this.peerError = `${this.targetIdInput} is unreachable!`; // custom error message
                            this.targetIdInput = "";
                        } else if (error.type === "unavailable-id") { // if requested id (thus username) is already taken
                            this.loading = false;
                            this.peerError = `${this.usernameInput} is already taken!`; // custom error message
                        } else this.peerError = error; // default error message
                    });

                    // when peer receives a connection
                    this.peer.on('connection', conn => {
                        if (!this.peerIds.includes(conn.peer)) {
                            this.configureConnection(conn);

                            conn.on("open", () => {
                                this.addConnection(conn);

                                // send every connection previously established to connect everyone (merge chat rooms)
                                conn.send({
                                    type: "connections",
                                    peerIds: this.peerIds
                                });
                            });
                        }
                    });
                  }
                }

                submitLogin(event: Event) {
                    if (event) event.preventDefault(); // to prevent default behavior which is to POST to the same page

                    if (this.usernameInput && this.usernameInput.length > 0 && !this.loading) {
                        this.loading = true; // update status
                        this.peerError = ""; // reset error status

                        localStorage.setItem("username", this.usernameInput); // set username cookie to instanciate it at the next session

                        this.createPeer();
                    }
                }

                submitConnection(event: Event) {
                    event.preventDefault(); // to prevent default behavior which is to POST to the same page

                    const peerId = this.getPeerId(this.targetIdInput); // the peer's id we want to connect to
                    this.initiateConnection(peerId);
                }

                receiveChat(chat: any) {
                    this.chats.push(chat);
                    localStorage.setItem("chats", JSON.stringify(this.chats));
                }
                
                submitChat(event: Event) {
                    event.preventDefault(); // to prevent default behavior which is to POST to the same page

                    if (this.chatMessageInput.length > 0) {
                        // the chat object's data
                        const chat = {
                            sender: this.usernameInput,
                            message: this.chatMessageInput,
                            timestamp: new Date().getTime()
                        };

                        this.receiveChat(chat); // simulate receiving a chat
                        // send chat object to connected users
                        Object.values(this.connections).forEach(conn => {
                            conn.send({
                                type: "chat",
                                chat
                            });
                        });

                        this.chatMessageInput = ""; // reset chat message input
                    }
                }

}
</script>

<style scoped lang="scss">
 div {
      text-align: center;
  }

  p {
      margin: 0.18em;
  }

  #chatbox {
      height: 25rem;
      text-align: left;
      width: 95%;
      margin: 0 auto;
      overflow-y: scroll;
  }

  .row {
      width: 100%;
      margin: 0;
      padding: 0 2em;
  }
</style>