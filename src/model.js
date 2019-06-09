class Observable {
  constructor(data) {
    this._onChanges = [];
    Object.assign(this, data);
  }

  subscribe(onChange) {
    this._onChanges.push(onChange);
  }

  unsubscribe(onChange) {
    const index = this._onChanges.indexOf(onChange);
    if (index !== -1) {
      this._onChanges.splice(index, 1);
    }
  }
  
  _notify() {
    this._onChanges.forEach(onChange => onChange(this, ...arguments));
  }
}

export const TodoListActions = {
  
};

export class TodoList extends Observable {
  constructor(user, todos = []) {
    super({ user, todos });
  }

  add(todo) {
    const lastId = this.todos.reduce((lastId, todo) => {
      return todo.id > lastId ? todo.id : lastId;
    }, 0);
    this.todos.push(Object.assign({id: lastId+1}, todo));
    this._notify();
  }

  updateTodo(todo) {
    const storedTodo = this.todos.find(t => t.id === todo.id);
    if (storedTodo) {
      Object.assign(storedTodo, todo);
      this._notify();
    }
  }

  getCompleted(completed) {
    return this.todos.filter(t => t.completed === completed).sort((a, b) => b.id - a.id);
  }

  get name() {
    return `${this.user.name}'s todos`;
  }

  get progress() {
    return this.todos.reduce((acc, todo) => acc + todo.completed, 0) / this.todos.length;
  }

  static createLists(users, todos) {
    const todoLists = users.reduce((todoLists, user) => {
      todoLists[user.id] = new TodoList(user);
      return todoLists;
    }, {});
    
    for (const todo of todos) {
      todoLists[todo.userId].add(todo);
    }

    return Object.values(todoLists).sort((a, b) => a.name.localeCompare(b.name));
  }
}


export class TodoBook extends Observable {
  constructor(todoLists: TodosList[]) {
    super({todoLists});
    this.todoLists = todoLists;
    const notify = this._notify.bind(this);
    todoLists.forEach(tl => tl.subscribe(notify));
  }

  get progress() {
    return this.todoLists.reduce((acc, todoList) => acc + todoList.progress, 0) / this.todoLists.length;
  }
}