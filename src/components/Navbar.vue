<template>
  <nav>
    <v-toolbar flat app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Vue</span>
        <span>Trader</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" v-if="account.status.loggedIn">
        <span @click="logOut()">Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-list>
        <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
  data() {
    return {
      drawer: false,
      links: [
        { icon: "dashboard", text: "Dashboard", route: "/" },
        { icon: "folder", text: "MyStrategies", route: "/projects" },
        { icon: "people", text: "Team", route: "/team" },
        { icon: "person", text: "Profile", route: "/profile" },
        { icon: "today", text: "Todo", route: "/todo" },
        { icon: "toc", text: "Todo List", route: "/listtodo" },
        { icon: "face", text: "About Us", route: "/about" },
        { icon: "bug_report", text: "Contact Us", route: "/about" }
      ]
    };
  },
  methods: {
    logOut() {
      this.$router.push("/login");
    }
  }
};
</script>
