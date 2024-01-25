window.onload = () => {
    loadList();
    new Sortable(groceryList, {
        animation: 150
    });
};

function newItem() {
    let itemText = document.getElementById("itemInput").value;
    let quantity = document.getElementById("quantityInput").value;
    let category = document.getElementById("categoryInput").value;
    
    if (itemText === '') {
        alert("Please enter an item!");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = `${itemText} <span class="quantity">x${quantity}</span> <span class="category">${category}</span>`;
    li.onclick = () => li.classList.toggle('checked');
    document.getElementById("groceryList").appendChild(li);
    
    document.getElementById("itemInput").value = '';
    document.getElementById("quantityInput").value = '1';
    saveList();
}

function clearList() {
    if (confirm("Are you sure you want to clear all items?")) {
        document.getElementById("groceryList").innerHTML = '';
        saveList();
    }
}

function clearChecked() {
    let items = document.querySelectorAll('#groceryList li.checked');
    items.forEach(item => item.remove());
    saveList();
}

function saveList() {
    let listHtml = document.getElementById("groceryList").innerHTML;
    localStorage.setItem("groceryList", listHtml);
}

function loadList() {
    let savedList = localStorage.getItem("groceryList");
    if (savedList) {
        document.getElementById("groceryList").innerHTML = savedList;
        let items = document.querySelectorAll('#groceryList li');
        items.forEach(item => item.onclick = () => item.classList.toggle('checked'));
    }
}
