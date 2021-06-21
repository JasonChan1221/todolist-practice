const itemList = document.getElementsByClassName('todo')[0];
let time = new Date();
let items = JSON.parse(localStorage.getItem('items')) || [];

document.querySelector('#todoForm').addEventListener('submit',(event)=>{
    event.preventDefault();
    const form = event.target;
    if(!form.info.value=="")
    addItem(form.info.value,time.toLocaleString(),items.length);
    else
        alert("You must write something to add!");
})

function addItem(content,dateTime,id){
    //add item to localStorage and refresh the page
    saveItem(content,dateTime,id);
    itemList.innerHTML="";
    getItem();
}

function deleteItem(event){
    //delete the todo item
    const btn = event.currentTarget;
    const str_id = btn.id.replace("del_", "");
    const id = parseInt(str_id);
    for(let i=0;i<items.length;i++){
        if(items[i].id==id){
            items.splice(i,1);
        }
    }
    //update localStorage and refresh page
    localStorage.setItem('items',JSON.stringify(items));
    itemList.innerHTML="";
    getItem();
}

function saveItem(content,dateTime,id){
    //using localStorage to store the content
    items.push({content:content,time:dateTime,id:id});
    localStorage.setItem('items',JSON.stringify(items));
}

function getItem(){
    //take all the item in items then display it
    for(let item of items){
    itemList.innerHTML+=`
    <div class="item" id="item${item.id}">
    <div class="content">
    <span>${item.content}</span>
    <i class="bi bi-x-square" id="del_${item.id}"></i>
    </div>
    <div class="date">
        <span>${item.time}</span>
    </div>
    </div>
    `
    }
    for(let item of items){
        let del = document.getElementById(`del_${item.id}`);
        del.addEventListener('click',(event)=>{
            deleteItem(event);  
        })
    }
}

getItem();