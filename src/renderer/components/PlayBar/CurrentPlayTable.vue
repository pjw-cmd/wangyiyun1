<template>
  <div class="play-table">
    <track-list :isShowHead="true" :isShowActions="true" :tracks="current_play_list" @dblclick="play" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import TrackList from '@/components/Common/track-list/index.js'
import TrackList from '@/components/PlayBar/track-list/index.js'
import { watch } from 'fs'
import { log } from 'util'
import { updateUserPlayList } from "@/api/userplaylist";


export default {
  components: { TrackList },
  computed: {
    ...mapGetters('play', [
      'current_play_list'
    ]),
    ...mapGetters("User", ["userId"]),
  },
  methods: {
    play (tracks, index) {
      console.log("current_play_table",this.current_play_list)
      this.$store.dispatch('play/selectPlay', { tracks, index })
    }
  },
  watch:{
    current_play_list(){
      console.log("watch",this.current_play_list)  
      console.log(this.userId)
      let that = this
      let params={
        'play_list':that.current_play_list,
        'user_id':that.userId
      }
      let result = updateUserPlayList(params)
      // TODO 
    }
  }
}
</script>
