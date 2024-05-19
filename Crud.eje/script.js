
const form = document.getElementById('formRegister');
const entradaNombre = document.getElementById('nameinput'); 
const entradaId = document.getElementById('Idinput');
const tablebody = document.getElementById('tablebody');


function displayDate() {
    document.getElementById("submitbutton").innerHTML = Date();
}



let data = JSON.parse(localStorage.getItem('formData')) || [];


form.addEventListener('submit', function(event) {

   
    event.preventDefault();

    const name = entradaNombre.value;
    const idUsuario = entradaId.value;
    const currentDate = new Date().toLocaleString();
    

    if (name && idUsuario) {
        const newData = { name, idUsuario, date: currentDate }; 
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
       
        form.reset();
    } else {
        alert('Favor llenar todos los campos');
    }
})


function saveDataToLocalStorage() {
    localStorage.setItem('formData', JSON.stringify(data));
}




function renderTable() {
    tablebody.innerHTML = '';

   
    data.forEach(function(item, index) {
        
        const newRow = document.createElement('tr');

       
        const nameCell = document.createElement('td');
        const idUsuarioCell = document.createElement('td');
        const dateCell = document.createElement('td'); 
        const actionCell = document.createElement('td');

       
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

      
        nameCell.textContent = item.name;
        idUsuarioCell.textContent = item.idUsuario;
        dateCell.textContent = item.date; 
      
        editButton.textContent = 'Editar';
        deleteButton.textContent = 'Eliminar';

       
        editButton.classList.add('button', 'button--secundary');
        deleteButton.classList.add('button', 'button--terciary');

       
        editButton.addEventListener('click', function() {
            editData(index);
        });

        deleteButton.addEventListener('click', function() {
            deleteData(index);
        });

        
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

       
        newRow.appendChild(nameCell);
        newRow.appendChild(idUsuarioCell); 
        newRow.appendChild(dateCell);
        newRow.appendChild(actionCell);

        
        const headerRow = document.querySelector('.crudtable thead tr');
        headerRow.parentNode.insertBefore(newRow, headerRow.nextSibling);
    });
}


function editData(index) {
    const item = data[index];
    entradaNombre.value = item.name;
    entradaId.value = item.idUsuario; 
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function deleteData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();