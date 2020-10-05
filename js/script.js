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
    taskReplace();
  }


});


function taskReplace() {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));

  todoList.innerHTML = "";

  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {

      let done = '';


      if (returnObj) {
      if (returnObj[raz][i].done) {
        done = `active`;
      }
        todoList.innerHTML += `
    

  <li data-id="${returnObj[raz][i].id}" class="todoItem ${done}">${returnObj[raz][i].title}
  <div data-id="${returnObj[raz][i].id}" class="delete"></div>
  </li>
   `;

      }


      taskDelete();
      doneItem();
    }
  }
}
taskReplace();



function taskDelete() {


  let itemDelete = document.querySelectorAll('.delete');

  itemDelete.forEach((i, key) => {

    i.addEventListener('click', () => {



      deleter(i.dataset.id);

      taskReplace();

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


  let serialObj = JSON.stringify(returnObj); 
  localStorage.setItem("todo-list", serialObj);  



}


function doneItem() {


  let todoItem = document.querySelectorAll('.todoItem');


  todoItem.forEach((i, key) => {

    i.addEventListener('click', () => {


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
      taskReplace();
    });

  });

}

let filter = document.querySelectorAll('.footerRight input');

filter[0].addEventListener('click', (e) => {


  taskReplace();

});
filter[1].addEventListener('click', (e) => {


  taskReplaceActive();

});
filter[2].addEventListener('click', (e) => {


  taskReplaceCompleted();

});


function taskReplaceActive() {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));

  todoList.innerHTML = "";


  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {


      if (returnObj && returnObj[raz][i].done == false) {

        todoList.innerHTML += `
    

  <li data-id="${returnObj[raz][i].id}" class="todoItem ">${returnObj[raz][i].title}
  <div data-id="${returnObj[raz][i].id}" class="delete"></div>
  </li>
   `;

      }


      taskDelete();
      doneItem();
    }
  }
}

function taskReplaceCompleted() {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));

  todoList.innerHTML = "";



  for (let raz in returnObj) {
    for (let i = 0; i < returnObj.todos.length; i++) {


      let done = '';
      if (returnObj[raz][i].done) {
        done = `active`;
      }

      if (returnObj && returnObj[raz][i].done == true) {

        todoList.innerHTML += `
    

  <li data-id="${returnObj[raz][i].id}" class="todoItem ${done}">${returnObj[raz][i].title}
  <div data-id="${returnObj[raz][i].id}" class="delete"></div>
  </li>
   `;

      }

      taskDelete();
      doneItem();
    }
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

      if (all < 0) {
        returnObj[raz][x].done = true;
        console.log('baga');

      } else {
        returnObj[raz][x].done = false;
        console.log('Daga');

      }


    }
  }

  let serialObj = JSON.stringify(returnObj);
  localStorage.setItem("todo-list", serialObj);
  taskReplace();

});

let buttons = document.querySelectorAll('.footerLeft input');

buttons[0].addEventListener('click', () => {

  let returnObj = JSON.parse(localStorage.getItem("todo-list"));
  for (let raz in returnObj) {
    for (let x = 0; x < returnObj.todos.length; x++) {

      if (returnObj[raz][x].done) {
        deleter(returnObj[raz][x].id);
      }
    }
  }
  taskReplace();
});

buttons[1].addEventListener('click', () => {
  localStorage.clear();
  taskReplace();
});