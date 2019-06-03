import axios from 'axios';
const API_URL = 'http://localhost:4000/api';

export class APIService {


    constructor() {}

    getTodos(inmodel) {

        const url = `${API_URL}/${inmodel}`;

        return axios.get(url).then(response => response.data);
    }
    getTodo(pk) {

        const url = `${API_URL}/api/jokes/${pk}`;

        return axios.get(url).then(response => response.data);

    }

    deleteTodo(todo) {

        const url = `${API_URL}/api/todos/${todo.pk}`;
        return axios.delete(url);
    }

    createTodo(todo) {
        const url = '${API_URL}/api/todos/';
        return axios.post(url, todo);
    }

    updateTodo(todo) {
        const url = '${API_URL}/api/todos/${todo.pk}';
        return axios.put(url, todo);
    }
}
