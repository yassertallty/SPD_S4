const list_cont=document.getElementById('list_cont');
const new_to_do=document.getElementById('new_to_do');
new_to_do.addEventListener('keydown',addtask);

function addtask(event){
    if(event.key==='Enter'){
        event.preventDefault();
        if(new_to_do.value.trim()===''){
            alert('Please enter a value before proceeding')
        }
        else{
            let li=document.createElement('li');
            li.className="list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML=`<span>${new_to_do.value}</span>
                          <i class="far fa-trash-alt delete"></i>`
            list_cont.appendChild(li);
            new_to_do.value='';
        }
        
    }

}

list_cont.addEventListener("click",function(event){
    if(event.target.classList.contains('delete')){
        event.target.parentElement.remove();
    }
});

const search=document.querySelector('.search input');
search.addEventListener('input',filter);
function filter(){
    const user_input=search.value.toLowerCase();
    const todos=document.querySelectorAll('#list_cont li')
    todos.forEach(todo=>{
        const val=todo.querySelector('span').textContent.toLowerCase();
        if(val.includes(user_input)){
            todo.classList.remove('hide');
        } else{
            todo.classList.add('hide');
        }
    });
    if(user_input===''){
        todos.forEach(todo=>{
            todo.classList.remove('hide');
        })
    }
}
