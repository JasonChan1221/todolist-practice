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
    saveItem(content,dateTime,id);
    itemList.innerHTML="";
    getItem();
}

function deleteItem(event){
    const btn = event.currentTarget;
    const str_id = btn.id.replace("del_", "");
    const id = parseInt(str_id);
    for(let i=0;i<items.length;i++){
        if(items[i].id==id){
            console.log(items[i]);
            items.splice(i,1);
        }
    }
    localStorage.setItem('items',JSON.stringify(items));
    itemList.innerHTML="";
    getItem();
}

function saveItem(content,dateTime,id){
    items.push({content:content,time:dateTime,id:id});
    localStorage.setItem('items',JSON.stringify(items));
}

function getItem(){
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