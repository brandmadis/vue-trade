<template>
  <div id="container" class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2">
        <div class="alert alert-warning" v-show="showError">
          <button type="button" class="close" @click="hideMessage()">X</button>
          <strong>Error!</strong>
        </div>
        <h1>Create a Todo</h1>

        <div class="info-form">
          <form>
            <div class="form-group">
              <label for="name">Todo name</label>
              <input
                v-model="todo.name"
                type="text"
                class="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter Name"
              >
              <small id="nameHelp" class="form-text text-muted">Enter your todo's name</small>
            </div>
          </form>

          <button class="btn btn-primary" v-if="!this.todo.id" @click="createTodo()">
            <span>Create</span>
          </button>
          <button class="btn btn-primary" v-if="this.todo.id" @click="updateTodo()">
            <span>Update</span>
          </button>

          <button class="btn btn-primary" @click="newTodo()">New..</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { APIService } from "../APIService";

const apiService = new APIService();

export default {
  name: "CreateTodo",

  components: {},

  data() {
    return {
      showError: false,
      showSuccess: "",
      todo: {}
    };
  },

  methods: {
    createTodo() {
      apiService.createTodo(this.todo).then(
        result => {
          if (result.status === 201) {
            this.todo = result.data;
          }
        },
        error => {
          this.$log.debug("createTodo ", error);
          this.showError = true;
        }
      );
    },
    updateTodo() {
      apiService.updateTodo(this.todo).then(
        result => {
          this.showSuccess = result;
        },
        error => {
          this.$log.debug("createTodo ", error);
          this.showError = true;
        }
      );
    },
    newTodo() {
      this.todo = {};
    }
  },

  mounted() {
    if (this.$route.params.pk) {
      apiService.getTodo(this.$route.params.pk).then(todo => {
        this.todo = todo;
      });
    }
  }
};
</script>
<style scoped>
.aform {
  margin-left: auto;
  width: 60%;
}
</style>
