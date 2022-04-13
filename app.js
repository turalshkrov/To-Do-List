let sortIcon = document.querySelector('#sort-icon');
let addButton = document.querySelector('.add');
let list = document.querySelector('.list')
let sortClickCounter = 0;
let storageArray = JSON.parse(localStorage.getItem('toDoList'));

if (sortArray.length == 0) {
    sortArray = [];
}

storageArray.forEach(item => {
    list.innerHTML += `<div class="list-item">
        <p class="to-do-text">${item}</P>
        <img class="remove-icon" src="images/remove-icon.svg" alt="">
    </div>`;
})

list.innerHTML += `<div class="list-input">
    <input id="input" type="text">
    <img class="remove-icon" src="images/remove-icon.svg" alt="">
</div>`;

list.addEventListener('click', (e) => {
    if (e.target.className === 'remove-icon' && e.target.parentElement.firstElementChild.id !== 'input') {
        e.target.parentElement.remove();
        let itemText = e.target.parentElement.firstElementChild.innerText;
        storageArray.splice(storageArray.indexOf(itemText),1);
        localStorage.setItem('toDoList', JSON.stringify(storageArray));
    }
})

sortIcon.addEventListener('mouseover', (e) => {
    if (sortClickCounter % 2 === 1) {
        e.target.src = 'images/sort-reverse-hover.svg';
    }
    else {
        e.target.src = 'images/sort-icon-hover.svg';
    }
})
sortIcon.addEventListener('mouseout', (e) => {
    if (sortClickCounter % 2 === 1) {
        e.target.src = 'images/sort-reverse.svg';
    }
    else {
        e.target.src = 'images/sort-icon.svg';
    }
})

addButton.addEventListener('click', () => {
    let listItem = document.querySelector('input');
    if (listItem.value.length !== 0) {
        storageArray.push(listItem.value);
        let newListText = document.createElement('p');
        newListText.className = 'to-do-text';
        newListText.innerText = listItem.value;
        listItem.parentElement.insertBefore(newListText, listItem.nextSibling);
        listItem.parentElement.className = 'list-item';
        listItem.remove();
        list.innerHTML += `<div class="list-input">
            <input id="input" type="text">
            <img class="remove-icon" src="images/remove-icon.svg" alt="">
        </div>`;
        localStorage.setItem('toDoList', JSON.stringify(storageArray));
    }
})

function sortArray(arr) {
    arr.sort((a, b) => {
        let aElement = a.firstElementChild.innerText;
        let bElement = b.firstElementChild.innerText;
        if(aElement > bElement) return 1;
        if(aElement < bElement) return -1;
    });
}

function sortReverseArray(arr) {
    arr.sort((a, b) => {
        let aElement = a.firstElementChild.innerText;
        let bElement = b.firstElementChild.innerText;
        if(aElement < bElement) return 1;
        if(aElement > bElement) return -1;
    });
}

sortIcon.addEventListener('click', (e) => {
    let listItems = [...document.querySelectorAll('.list-item')];
    document.querySelector('.list').innerHTML = ``;
    sortClickCounter += 1;
    if (sortClickCounter % 2 === 1) {
        sortArray(listItems);
        e.target.src = 'images/sort-reverse.svg';
    }
    else {
        sortReverseArray(listItems);
        e.target.src = 'images/sort-icon.svg';
    }
    listItems.forEach(item => {
        document.querySelector('.list').appendChild(item);
    })
    list.innerHTML += `<div class="list-input">
        <input id="input" type="text">
        <img class="remove-icon" src="images/remove-icon.svg" alt="">
    </div>`;

})
