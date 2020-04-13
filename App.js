//selecters
const todoInput=document.querySelector('.todo-input');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector('.filter-todo');

//event Listner
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addToDo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


//Function
 function addToDo(event){
     event.preventDefault();
     //toDO div
 const todoDiv=document.createElement('div');
 todoDiv.classList.add('todo');
 
 
 //todo List
 const todoItem=document.createElement('li');
 todoItem.innerHTML=todoInput.value;
 todoItem.classList.add('todo-item');
 saveLocalTodos(todoInput.value);
 todoDiv.appendChild(todoItem);
 
 //check button
 const completeButton=document.createElement('button');
 completeButton.innerHTML='<i class="fas fa-check"></i>';
 completeButton.classList.add('complete-btn');
 todoDiv.appendChild(completeButton);

 //delete button
 const trashButton=document.createElement('button');
 trashButton.innerHTML='<i class="fas fa-trash"></i>';
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);

 //append inside it
todoList.appendChild(todoDiv);
//clear input value
todoInput.value="";
}

function deleteCheck(e)
{
    const itm=e.target;
    if(itm.classList[0]=='trash-btn'){
        const parent=itm.parentElement;
        parent.classList.add("fall");
        removelocatStorage(parent);
        //addEventListner on transition
        parent.addEventListener('transitionend',()=>{
            parent.remove();
        })
        
    }

    //check marks
    if(itm.classList[0]=='complete-btn'){
        const parent=itm.parentElement;
        parent.classList.toggle("completed");
    }
}

function filterTodo(e){
const todos=todoList.childNodes;

console.log(todos);
 todos.forEach(todo=>{

    console.log(todo);
    

        switch (e.target.value){
            case "all":
                todo.style.display="flex";
                break;
            case "Completed":
                console.log('displaying completed List');
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";

                }else{
                    todo.style.display="none";
                }
                break;
            case "Remaining":
                console.log('displaying uncompleted List');
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";

                }else{
                    todo.style.display="none";
                }
                
                break;
            default:
                console.log('displaying default');
        }
 })

}

function saveLocalTodos(todo){
    //check anythis is there in local storage
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
todos.forEach((todo)=>{
        //toDO div
 const todoDiv=document.createElement('div');
 todoDiv.classList.add('todo');
 
 
 //todo List
 const todoItem=document.createElement('li');
 todoItem.innerHTML=todo;
 todoItem.classList.add('todo-item');
 todoDiv.appendChild(todoItem);
 
 //check button
 const completeButton=document.createElement('button');
 completeButton.innerHTML='<i class="fas fa-check"></i>';
 completeButton.classList.add('complete-btn');
 todoDiv.appendChild(completeButton);

 //delete button
 const trashButton=document.createElement('button');
 trashButton.innerHTML='<i class="fas fa-trash"></i>';
 trashButton.classList.add('trash-btn');
 todoDiv.appendChild(trashButton);

 //append inside it
todoList.appendChild(todoDiv);
})
}
 
function removelocatStorage(todo){
    let todos;
    if(localStorage.getItem('todos')==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoindex=todo.children[0].innerText;
    console.log(todoindex);
    todos.splice(todos.indexOf(todoindex,1),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}
