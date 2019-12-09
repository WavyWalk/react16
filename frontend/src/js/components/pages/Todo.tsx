import {SubscriptionState} from "../../lib/statemanagement/SubscriptionState";
import React, {useRef, useState} from "react";
import {updatesSubscribers} from "../../lib/statemanagement/decorators/updatesSubscribers";
import {StateModel} from "../../lib/statemanagement/StateModel";
import {dispatches} from "../../lib/statemanagement/decorators/dispatches";

export class Todo {

    static nextTodoId = 0

    id: number
    title: string
    isCompleted: boolean

    constructor(title: typeof Todo.prototype.title, isCompleted: typeof Todo.prototype.isCompleted) {
        this.id = Todo.nextTodoId += 1
        this.title = title
        this.isCompleted = isCompleted
    }

}

export class TodoState extends SubscriptionState {

    static instance = new TodoState()

    todos: Todo[] = []

    @updatesSubscribers()
    addTodo(todo: Todo) {
        this.todos.push(todo)
    }

    @updatesSubscribers()
    removeTodo(todo: Todo) {
        this.todos = this.todos.filter((it) => {
            return it !== todo
        })
    }

    @updatesSubscribers()
    toggleIsCompleted(todo: Todo) {
        todo.isCompleted = !todo.isCompleted
    }

    getTodos() {
        return this.todos
    }

    getCompleted() {
        return this.todos.filter((it) => {
            return it.isCompleted
        })
    }

    getPending() {
        return this.todos.filter((it) => {
            return !it.isCompleted
        })
    }

}

const TodoItem = (props: { todo: Todo }) => {

    const todoState = TodoState.instance.use()
    const todo = props.todo

    return <div>
        {todo.isCompleted && 'COMPLETED:'} {todo.title}
        <button
            onClick={() => {
                todoState.toggleIsCompleted(todo)
            }}
        >
            mark as {todo.isCompleted ? 'uncompleted' : 'completed'}
        </button>
        <button onClick={() => {
            todoState.removeTodo(todo)
        }}>
            delete
        </button>
    </div>
}

export const TodoContainer = () => {
    const todoState = TodoState.instance.use()
    const [displayMode, setDisplayMode] = useState<"all" | "completed" | "pending">("all")

    let todos = todoState.todos
    switch (displayMode) {
        case "completed":
            todos = todoState.getCompleted()
            break
        case "pending":
            todos = todoState.getPending()
            break
    }

    return <div>
        {todos.map((todo) => {
            return <TodoItem key={todo.id} todo={todo}/>
        })}
        <CreateTodo/>
        <button onClick={() => {
            setDisplayMode("all")
        }}>
            showwall
        </button>
        <button onClick={() => {
            setDisplayMode("completed")
        }}>
            show completed
        </button>
        <button onClick={() => {
            setDisplayMode("pending")
        }}>
            show pending
        </button>
    </div>
}

function createTodo(title: string) {
    return new Todo(title, false)
}

export const CreateTodo = () => {
    const todos = TodoState.instance.use()
    const [inputValue, updateInputValue] = useState("")

    return <div>
        <input type="text" value={inputValue}
               onChange={(e) => {
                   updateInputValue(e.target.value)
               }}
        />
        <button onClick={() => {
            let todo = createTodo(inputValue)
            todos.addTodo(todo)
            updateInputValue('')
        }}>add todo
        </button>
    </div>
}


