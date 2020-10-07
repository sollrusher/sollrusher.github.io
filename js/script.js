let listItem = {

  todos: []
};

let textPlace = document.querySelector('.inputTodo');
let todoList = document.querySelector('.todoList');

textPlace.addEventListener('keypress', function (e) {
  if (e.key === 'Enter' && textPlace.value != "") {


    let idNew = 0;
    let returnObj = JSON.parse(localStorage.getItem("todo-list"));

    if (returnObj && returnObj.todos.length!=0) {

      let lengthArr = returnObj.todos.length - 1;
      idNew = returnObj.todos[lengthArr].id;
      idNew++;

      returnObj.todos.push({
        id: idNew,
        title: `${textPlace.value}`,
        done: false
      });

      let serialObj = JSON.stringify(returnObj); 
      localStorage.setItem("todo-list", serialObj);       

    } else {
      listItem.todos.splice(0,1);
      listItem.todos.push({
        id: idNew,
        title: `${textPlace.value}`,
        done: false
      });


      let serialObj = JSON.stringify(listItem); 
      localStorage.setItem("todo-list", serialObj);      
    }


    textPlace.value = "";
    textPlace.placeholder = "Что вам ещё нужно сделать?";
    
    let filter = document.querySelectorAll('.filter');
    if(filter[0].classList.contains("selected"))
    {
         taskReplace();
    }
    if(filter[1].classList.contains("selected"))
    {
         taskReplaceActive();
    }
    if(filter[2].classList.contains("selected"))
    {
         taskReplaceCompleted();
    }
 
  }


});


function taskReplace() {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));

  todoList.innerHTML = "";
      let counter = 0;
  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {

      let done = '';


      if (returnObj) {
      if (returnObj[raz][i].done) {
        done = `active`;
      }
      else{
        counter ++;
      }
         todoList.innerHTML += `
         <li data-id="${returnObj[raz][i].id}" class="todoItem ${done}">

            <input data-id="${returnObj[raz][i].id}" type="checkbox" class='cheks ${done}'>
            <label>${returnObj[raz][i].title}</label>
            <button data-id="${returnObj[raz][i].id}" class="delete"></button>
            

         </li>

         `;
  
        


      }

      let count = document.querySelector('.count');
      count.innerHTML = `Осталось ${counter}`;

      taskDelete();
      doneItem();
    }
  }    
  let hideBlock = document.querySelector('.todofooter');
  if (returnObj.todos.length==0) {
    hideBlock.style.display='none';
  }
  else{
    hideBlock.style.display='flex';
  }
}
taskReplace();



function taskDelete() {


  let itemDelete = document.querySelectorAll('.delete');

  itemDelete.forEach((i, key) => {

    i.addEventListener('click', () => {



      deleter(i.dataset.id);

      let filter = document.querySelectorAll('.filter');
      if(filter[0].classList.contains("selected"))
      {
           taskReplace();
      }
      if(filter[1].classList.contains("selected"))
      {
           taskReplaceActive();
      }
      if(filter[2].classList.contains("selected"))
      {
           taskReplaceCompleted();
      }

    });
  });

}

function deleter(idsher) {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));
  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {

      if (idsher == returnObj[raz][i].id) {

        returnObj[raz].splice(i, 1);
      }


    }
  }
  if (returnObj.todos.length==0) {

    let hideBlock = document.querySelector('.todofooter');
    hideBlock.style.display='none';

  }

  let serialObj = JSON.stringify(returnObj); 
  localStorage.setItem("todo-list", serialObj);  



}


function doneItem() {


  let cheks = document.querySelectorAll('.cheks');

 
  cheks.forEach((i, key) => {

    i.addEventListener('click', (e) => {

      
      let returnObj = JSON.parse(localStorage.getItem("todo-list"));
      for (let raz in returnObj) {
        for (let x = 0; x < returnObj.todos.length; x++) {



          if (i.dataset.id == returnObj[raz][x].id) {

            switch (returnObj[raz][x].done) {
              case false:
                returnObj[raz][x].done = true;
                break;
              case true:
                returnObj[raz][x].done = false;
                break;
            }

          }
        }
      }

      let serialObj = JSON.stringify(returnObj); 
      localStorage.setItem("todo-list", serialObj); 
      
      let filter = document.querySelectorAll('.filter');
      if(filter[0].classList.contains("selected"))
      {
           taskReplace();
      }
      if(filter[1].classList.contains("selected"))
      {
           taskReplaceActive();
      }
      if(filter[2].classList.contains("selected"))
      {
           taskReplaceCompleted();
      }
    });

  });

}



let filter = document.querySelectorAll('.filter');
filter[0].addEventListener('click', (e) => {

  filter[0].classList.add("selected");
  filter[1].classList.remove("selected");
  filter[2].classList.remove("selected");

  taskReplace();

});
filter[1].addEventListener('click', (e) => {

  filter[0].classList.remove("selected");
  filter[1].classList.add("selected");
  filter[2].classList.remove("selected");

  taskReplaceActive();

});
filter[2].addEventListener('click', (e) => {
  
  filter[0].classList.remove("selected");
  filter[1].classList.remove("selected");
  filter[2].classList.add("selected");
  
  taskReplaceCompleted();

});



function taskReplaceActive() {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));

  todoList.innerHTML = "";
  let counter=0;

  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {


      if (returnObj && returnObj[raz][i].done == false) {

        todoList.innerHTML += `
    
        <li data-id="${returnObj[raz][i].id}" class="todoItem">

            <input data-id="${returnObj[raz][i].id}" type="checkbox" class='cheks'>
            <label>${returnObj[raz][i].title}</label>
            <button data-id="${returnObj[raz][i].id}" class="delete"></button>
            

         </li>

         `;



      let count = document.querySelector('.count');
      counter++;
      count.innerHTML = `Осталось ${counter}`;
      }



      taskDelete();
      doneItem();
    }
  }
  let hideBlock = document.querySelector('.todofooter');
  if (returnObj.todos.length==0) {
    hideBlock.style.display='none';
  }
  else{
    hideBlock.style.display='flex';
  }
}

function taskReplaceCompleted() {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));

  todoList.innerHTML = "";

      let counter=0;

  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {




      if (returnObj && returnObj[raz][i].done == true) {

        todoList.innerHTML += `
    
        <li data-id="${returnObj[raz][i].id}" class="todoItem active">

            <input data-id="${returnObj[raz][i].id}" type="checkbox" class='cheks active'>
            <label>${returnObj[raz][i].title}</label>
            <button data-id="${returnObj[raz][i].id}" class="delete"></button>
            

         </li>

         `;

      }
      else if(returnObj[raz][i].done == true){
        let count = document.querySelector('.count');
        counter++;
        count.innerHTML = `Осталось ${counter}`;
      }

      taskDelete();
      doneItem();
    }
  }
  let hideBlock = document.querySelector('.todofooter');
  if (returnObj.todos.length==0) {
    hideBlock.style.display='none';
  }
  else{
    hideBlock.style.display='flex';
  }
}

let checkAll = document.querySelector('.checkAll');

checkAll.addEventListener('click', () => {
  checkAll.classList.toggle("clicked");
  let all = 0;
  let returnObj = JSON.parse(localStorage.getItem("todo-list"));
  for (let raz in returnObj) {
    for (let x = 0; x < returnObj.todos.length; x++) {

  

      if (returnObj[raz][x].done) {
        all++;
      } else {
        all--;
      }
      console.log(all);

      }


    }
    for (let raz in returnObj) {
      for (let x = 0; x < returnObj.todos.length; x++) {
    if (all < 0) {
      returnObj[raz][x].done = true;


    } else {
      returnObj[raz][x].done = false;

    }}
  }

  let serialObj = JSON.stringify(returnObj);
  localStorage.setItem("todo-list", serialObj);
  taskReplace();

});

let clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));
  for (let raz in returnObj) {
    for (let x = 0; x < returnObj.todos.length; x++) {

      if (returnObj[raz][x].done) {
        deleter(returnObj[raz][x].id);
      }
    }
  }

  let filter = document.querySelectorAll('.filter');
  if(filter[0].classList.contains("selected"))
  {
       taskReplace();
  }
  if(filter[1].classList.contains("selected"))
  {
       taskReplaceActive();
  }
  if(filter[2].classList.contains("selected"))
  {
       taskReplaceCompleted();
  }
});
