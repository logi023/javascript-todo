let itemIndex = 0;

window.onload = function() {
    document.querySelector('.add-item').addEventListener('click', addItem);
    document.querySelector('.add-text').addEventListener('keydown', function(event){
        if(event.keyCode === 13) {
            addItem();
        }
    });

    loadItemsFromStorage();
}

// 아이템 생성
const createItemElement = (text, id, checked) => {
    const itemList = document.querySelector('.item-list');

    const newItem = document.createElement('li');
    newItem.className = 'item';

    const checkItem = document.createElement('div');
    checkItem.className = "check-item";
    newItem.appendChild(checkItem);

    const itemDelete = document.createElement('button');
    itemDelete.className = 'item-delete';
    itemDelete.innerText = '삭제';
    itemDelete.setAttribute('onclick', 'deleteItem(this);');
    newItem.appendChild(itemDelete);

    const checkInput = document.createElement('input');
    checkInput.setAttribute('type', 'checkbox');
    checkInput.id = id;
    checkInput.checked = checked;
    checkInput.addEventListener('change', saveItemsToStorage); // Save on change
    checkItem.appendChild(checkInput);

    const checkLabel = document.createElement('label');
    checkLabel.innerText = text;
    checkLabel.setAttribute('for', id);
    checkLabel.setAttribute('tabindex', '0');
    checkItem.appendChild(checkLabel);

    itemList.appendChild(newItem);
}

// 아이템리스트에 아이템 추가하기
const addItem = () => {
    const todoInput = document.querySelector('.add-text');

    if (todoInput.value.split(' ').join('') === '') return;

    createItemElement(todoInput.value, itemIndex, false);
    
    todoInput.value = '';
    itemIndex += 1;

    saveItemsToStorage();
}

// 아이템 삭제하기
const deleteItem = (_this) => {
    _this.closest('.item').remove();
    saveItemsToStorage();
}

// 로컬스토리지에 저장하기
const saveItemsToStorage = () => {
    const itemList = document.querySelectorAll('.item');
    const itemListArray = [];
    
    itemList.forEach((item, index) => {
        const checkbox = item.querySelector('input[type=checkbox]');
        const label = item.querySelector('label');
        itemListArray.push({
            id: index,
            text: label.innerText,
            checked: checkbox.checked,
        });
    });
    localStorage.setItem('todoItems', JSON.stringify(itemListArray));
}

// 로컬스토리지에서 가져오기
const loadItemsFromStorage = () => {
    const itemList = document.querySelector('.item-list');
    const storedItems = localStorage.getItem('todoItems');

    if (storedItems) {
        const itemsArray = JSON.parse(storedItems);

        itemsArray.forEach(item => {
            createItemElement(item.text, item.id, item.checked);
        });
        
        itemIndex = itemsArray.length;
    }
}