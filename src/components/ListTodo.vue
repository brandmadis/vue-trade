<template>
  <div>
    <h1>Todos () yyyyXXXXXX</h1>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in todos" @click="selectTodo(todo)" v-bind:key="index">
          <td>{{ todo._id }}</td>

          <td>{{ todo.name }}</td>

          <td>
            <button class="btn btn-danger" @click="deleteTodo(todo)">X</button>
            <a class="btn btn-primary" v-bind:href="'/todo-update/' + todo.id">&#9998;</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { APIService } from "../APIService";

const apiService = new APIService();

export default {
  name: "ListTodo",

  components: {},

  data() {
    return {
      todos: [],
      numberOfTodos: 0
    };
  },

  methods: {
    getTodos() {
      apiService.getTodos("todo/todos").then(data => {
        this.$log.debug("data ", data);
        this.todos = data;

        this.numberOfProducts = data.count;
      });
    },
    deleteTodo(todo) {
      apiService.deleteTodo(todo).then(r => {
        if (r.status === 204) {
          alert("Todo deleted");

          this.$router.go();
        }
      });
    }
  },

  mounted() {
    this.$log.debug("mounted call");
    this.getTodos();
  }
};
</script>

<style scoped>
.list-horizontal li {
  display: inline-block;
}

.list-horizontal li:before {
  content: "\00a0\2022\00a0\00a0";

  color: #999;

  color: rgba(0, 0, 0, 0.5);

  font-size: 11px;
}

.list-horizontal li:first-child:before {
  content: "";
}
</style>
