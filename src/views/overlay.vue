<template>
    <div id="canvas">
        <transition-group  :name="transition_group">
            <BouncingEmote v-for="em in currentEmotes" :key="em.Id" :Url="em.Url" :width="em.Width"/>
        </transition-group>
    </div>
</template>

<script>
import BouncingEmote from '@/components/bouncing_emote.vue'
import Twitch from '@/utils/twitch.js'
import apis from '@/utils/tpd.js'

export default {
    name: 'OverlayView',
    components: {
        BouncingEmote
    },
    computed: {
        transition_group() {
        if (this.deleteAfter != "0") return "tr"
            return "fl"
      }
    },
    data() {
        return {
            channelID: null,

            // editable:
            maxEmoteLife: 3,
            channel: "shampan0v",
            //

            currentEmotes: [],
            Emotes: [],
            MessagesTemp: [],

            lastThink: Date.now(),

            meanMessagesPerSecond: 0,
        }
    },
    methods: {
        async get7tvchannel() {
        let stv = await apis.RetryOnError(apis.get7tvEmotes, [this.channelID], 3)
        if (stv.length > 0) {
          console.log("loaded seventv channel")
          this.Emotes = Object.assign(this.Emotes, stv[0])

          // initializing event api
        //   if (this.useEventAPI) {
        //     this.EventApi = new EventApi(stv[1], this.channelID, this.onEmoteAdd, this.onEmoteRename)

        //     this.EventApi.onDelete = this.onEmoteDelete
        //     this.EventApi.onAdd = this.onEmoteAdd
        //     this.EventApi.onRename = this.onEmoteRename

        //     this.EventApi.onBadgeCreate = this.onBadgeCreate
        //     this.EventApi.onBadgeDelete = this.onBadgeDelete
        //     this.EventApi.onPaintCreate = this.onPaintCreate
        //     this.EventApi.onPaintDelete = this.onPaintDelete

        //     this.EventApi.onPersonalEmotes = this.onPersonalEmotes

        //     this.EventApi.Connect()
        //   }
        }
        },
        async onUserID(id) {
            this.channelID = id
            this.get7tvchannel()

        },
        async calcMeanMessages() {
            let messagesPerSecond = 1 / ((Date.now() - this.lastThink)/1000)
            this.lastThink = Date.now()
            this.meanMessagesPerSecond = (this.meanMessagesPerSecond + messagesPerSecond) / 2
        },
        async decide(payload) {
            this.currentEmotes.push({
                Url: `https://cdn.7tv.app/emote/${payload.extEmotes[0].ID}/3x.webp`,
                Id: payload.tags.id,
                Width: Math.floor(payload.extEmotes[0].ratio*32)
            })
            setTimeout((id) => {
                this.currentEmotes = this.currentEmotes.filter((m) => m.Id != id)
            }, this.maxEmoteLife*1000, payload.tags.id);
        }
    },
    created: async function() {
        this.client = new Twitch(this.channel)
        this.client.OnUserId = this.onUserID
        this.client.OnPrivateMessage = async (payload) => {
                this.MessagesTemp.push(payload)
                payload.extEmotes = []
                /* eslint-disable no-unused-vars */
                for (const i of payload.parameters.split(" ")) {
                    if (this.Emotes[i]) {
                    let em = this.Emotes[i]
                    payload.extEmotes.push(em)
                    }
                }
                if (payload.extEmotes.length > 0) {
                    this.MessagesTemp.push(payload)
                    this.calcMeanMessages()
                    this.decide(payload)
                }
        }
        this.client.connect()
    },
}
</script>

<style>
    div #canvas {
        position: absolute;
        bottom: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        left: 0;
    }

    .tr-leave-active {
    transition: opacity 0.5s ease;
    }
    .tr-leave-to {
        opacity: 0;
    }
</style>