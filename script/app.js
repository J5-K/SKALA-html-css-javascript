import { loadTodos, saveTodos } from '../script/storage_app.js';

let todos = loadTodos();
let currentFilter = 'all';

// DOM 요소 캐싱
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filter-btn');
const summaryTotal = document.getElementById('summary-total');
const summaryCompleted = document.getElementById('summary-completed');
const quoteEl = document.getElementById('quote');

function render() {
    todoList.innerHTML = '';
    
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.done;
        if (currentFilter === 'completed') return todo.done;
        return true; 
    });

    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.done ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'toggle-checkbox';
        checkbox.checked = todo.done;

        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todo.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';

        li.append(checkbox, textSpan, deleteBtn);
        todoList.append(li);
    });

    updateSummary();
    saveTodos(todos);
}

function updateSummary() {
    summaryTotal.textContent = todos.length;
    summaryCompleted.textContent = todos.filter(t => t.done).length;
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return; 

    const newTodo = {
        id: Date.now().toString(), 
        text,
        done: false
    };

    todos.push(newTodo);
    todoInput.value = '';
    todoInput.focus();
    render();
}

async function fetchQuote() {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) throw new Error('네트워크 응답 오류');
        
        const data = await response.json();
        quoteEl.textContent = `오늘의 한마디: "${data.slip.advice}"`;
    } catch (error) {
        console.error('명언 로드 실패:', error);
        quoteEl.textContent = "오늘의 한마디: 시작이 반이다! 오늘도 파이팅!";
    }
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTodo();
});

todoList.addEventListener('click', (e) => {
    const li = e.target.closest('.todo-item');
    if (!li) return;

    const id = li.dataset.id;

    if (e.target.classList.contains('toggle-checkbox')) {
       
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            render();
        }
    } else if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        render();
    }
});

filters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filters.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    });
});

function init() {
    fetchQuote();
    render();
}

init();