

let btn = document.querySelector(".btn");
let inp = document.querySelector(".task-input");
let list = document.querySelector(".task-list");

render(); // для отображения всех данных на сайте 
// 1 раз вызов в глобальной сети----------------------------------+++++++++++++++++++++++++++


btn.addEventListener("click", () => {
  // событие на кнопку добавить (Add task)
  if (inp.value.trim() === "") {        // проверка на заполненность инпута 
    alert("Заполните поле!");
    return;                  // для остановления кода, иначе дейтвия ниже сработают 
  }
  let obj = { task: inp.value }; // создаем новый обьект с клбчем task и значением инпута (inp)
  setItemToStorage(obj);         //  вызов фнкц, добавляющая новыо созданные обьеки в хранилище localStorage с ключем task-data 
  render();                      // для отображения всех данных сразу после нажатия на кнопкку Add task 
  inp.value = "";                // для очищения input 
});

// Функция для создания новых тасков и отправки в localStorage
// data = []
function setItemToStorage(task) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.push(task);                     // в массив data добавляем новый обьект 
  localStorage.setItem("task-data", JSON.stringify(data));
}

// функция для отображения данных в браузере
function render() {
  if (!localStorage.getItem("task-data")) {
    // проверка на то, есть ли что-нибудь в localStorage, а именно наш ключ task-data
    localStorage.setItem("task-data", JSON.stringify([])); // если такого ключа нет, то создаем его и добавляем первое значение пустой массив
  }

  let newData = JSON.parse(localStorage.getItem("task-data")); // стягиваем массив с localStorage и преобразовываем в обычный формат js
  list.innerHTML = ""; // очищаем страницу
  newData.forEach((item, index) => {
    // перебираем массив и для каждого элемента создаём новый li тег с кнопками delete и edit
    let li = document.createElement("li");
    let btnDelete = document.createElement("button");
    let btnEdit = document.createElement("button");
    li.innerText = item.task;
    btnDelete.innerText = "Delete";
    btnEdit.innerText = "Edit";
    li.append(btnDelete);
    li.append(btnEdit);
    list.append(li);  // добавляет в тэг ul новый созданный li тэг 
    btnDelete.addEventListener("click", () => { // событие на кнопку delete 
      deleteElement(index); //вызов функции, в аргументы передаем индекс кнопки 
    
    })
    btnEdit.addEventListener('click', () => {
      editElement(index) //вызов функции edit в агрументы передаем индекс элемента  
    });
  });
}

// Функция для удаления таска
function deleteElement(id) {
  let data = JSON.parse(localStorage.getItem("task-data"));
  data.splice(id, 1); //с помощью метода splice удаляем нужный элемент из массива 
  localStorage.setItem("task-data", JSON.stringify(data));
  render();
}

//функция для редактирования таска  
// сохраняем в переменне элементы модального окна 

let mainModal = document.querySelector('.main-modal');
let btnCloser = document.querySelector('.btn-closer');
let btnSave = document.querySelector('.btn-save');
let inpEdit = document.querySelector('.inp-edit');

function editElement(id){
  mainModal.style.display = 'block' ;  // для отображения заготовленного модального окна
  let data = JSON.parse(localStorage.getItem('task-data'));
  inpEdit.setAttribute('id', id); // для сохранения нужного индекса в аттрибут инпута в виде id 
  inpEdit.value = data[id].task; // перезаписываем значения инпута на нужное значение из массива 
  // с localStorage 
} 
//событие на кнопку save 
btnSave.addEventListener('click', () => {
  if (inp.value.trim() === "") { //trim -смотрит на пробелы в начале предложения, не учитывает пробелы 
    alert("Заполните поле!");
    return;
  }
 
  let data = JSON.parse(localStorage.getItem('task-data')) ;
  let editTask = { //создаем новый обьект в ключем task и значением инпута edit 
    task: inpEdit.value,
  }; 
  let index = inpEdit.id; // в перем index сохраняем индекс li тэга 
  data.splice(index, 1, editTask)
  localStorage.setItem('task-data', JSON.stringify(data)); 
  mainModal.style.display = 'none'; // закрывает модальное окно 
  render() ; // для отображения данных 
})  

// кнопка закрыть 
btnCloser.addEventListener('click', () => {
  mainModal.style.display = 'none'
}) 
 

// содержит массив контактов и методы 
class ContactBook {
    constructor() {
        this.contacts = [];
    }
    add(info) {
        this.contacts.push(info); 
    }
    deleteAt(index) {
        this.contacts.splice(index, 1);
        contactBook.display(); // чтобы "обновить" карточки контактов
    }
    display() {
        const cardContainer = document.querySelector(".card-container");
        cardContainer.innerHTML = ""; // очищает контейнер
        const trashArray= document.getElementsByClassName("img-btn");

        document.getElementById("contact-form").reset(); //очищает форму после отправки контактов
        // цикл для создания массива форм карт
        for (let contact of this.contacts) {
            const createDiv = document.createElement("div");
            createDiv.classList.add("card"); // указывает div и класс карты
            const createP = document.createElement("p");
            const createImg = document.createElement("IMG");
            createImg.classList.add("img-btn"); // указывает div и class img-btn
            createImg.src = "./images/baseline-delete_forever24px.svg"; // предоставляет источник изображения

            // заполняет карту из массива
            createP.innerText = `Name: ${contact.name}
            Email: ${contact.email}
            Phone: ${contact.phone}



            // add elements
            cardContainer.appendChild(createDiv)
                         .appendChild(createP)
                         .appendChild(createImg); // creates div child paragraph and img element
            

            // hover effect for trash
            createImg.addEventListener("mouseenter", () => {
                createImg.classList.add("trash-hover");
            });
            createImg.addEventListener("mouseleave", () => {
                createImg.classList.remove("trash-hover");
            });

        };
        
        // event listener for deleting
        for (let index = 0; index < trashArray.length; index++) {
            trashArray[index].addEventListener("click", () => {
            contactBook.deleteAt(index);
                
            });

        };

    }
}

// build objects for array
class Contact {
    constructor(name, email, phone, relation) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.relation = relation;
    }
}

const contactBook = new ContactBook();

// event listener for adding contacts for button click
document.querySelector("#add-btn").addEventListener("click", () => {
    const input = document.querySelectorAll(".input-item");
    const select = document.querySelector(".select-options");
    const option = select.options[select.selectedIndex].value;
    contactBook.add(new Contact(input[0].value, input[1].value, input[2].value, option));
    
    contactBook.display();
});
