<template>
  <div class="todo">
    <h1>This is a Todo List page</h1>
    <listTodo></listTodo>
  </div>
</template>

<script>
// import createTodo from "@/components/CreateTodo";
import listTodo from "@/components/ListTodo";

export default {
  components: {
    listTodo
  }
};
</script>
