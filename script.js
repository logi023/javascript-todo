let itemIndex = 0;

window.onload = function() {
    document.querySelector('.add-item').addEventListener('click', addItem);
    document.querySelector('.add-text').addEventListener('keyup', function(event){
        if(event.keyCode === 13) {
            addItem();
        }
    });
}

// 등록
const addItem = () => {
    const todoInput = document.querySelector('.add-text');  
    const itemList = document.querySelector('.item-list');

    // if (todoInput.value === '') return;
    // console.log(todoInput.value)
    // console.log(todoInput.value.trim())
    if(todoInput.value.split(' ').join('') === '') return;
    
    // li 추가하기
    const item = document.createElement('li');
    item.className = 'item';
    item.className = 'item';
    itemList.appendChild(item);
    
    // checkbox div 추가하기
    const checkItem = document.createElement('div');
    checkItem.className = "check-item";
    item.appendChild(checkItem);
    // 삭제버튼 추가하기
    const itemDelete = document.createElement('button');
    itemDelete.className = 'item-delete';
    itemDelete.innerText = '삭제';
    itemDelete.setAttribute('onclick', 'deleteItem(this);');
    item.appendChild(itemDelete);
    
    // checkbox 추가하기
    const checkInput = document.createElement('input');
    checkInput.setAttribute('type', 'checkbox');
    checkInput.id = itemIndex;
    checkItem.appendChild(checkInput);
    // label 추가하기
    const checkLabel = document.createElement('label');
    checkLabel.innerText = todoInput.value;
    // checkLabel.setAttribute('onclick', 'handleComp(this);');
    checkLabel.setAttribute('for', itemIndex);
    checkLabel.setAttribute('tabindex', '0');
    checkItem.appendChild(checkLabel);
    
    todoInput.value = '';
    itemIndex += 1;
}

// 삭제
const deleteItem = (_this) => {
    _this.closest('.item').remove();
}