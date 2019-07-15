<template>
  <v-app class="grey lighten-4">
    <Navbar/>
    <v-content class="mx-4 mb-4">
      <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import { mapState, mapActions } from 'vuex'


export default {
  name: "App",
  computed: {
        ...mapState({
            alert: state => state.alert
        })
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear' 
        })
    },
    watch: {
        $route (to, from){
            // clear alert on location change
            this.clearAlert();
        }
    } ,
  components: { Navbar },
  data() {
    return {
      //
    };
  }
};
</script>
