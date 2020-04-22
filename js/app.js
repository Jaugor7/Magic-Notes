showNotes();

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];  //initialized empty list
    }
    else {
        notesObj = JSON.parse(notes); //list of notes in memory from object strinng
    }
    notesObj.push(addText.value); //push new added notes text to list
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addText.value = '';

    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";

    notesObj.forEach(function(element, index){
        html += `
            <div class="card noteCard mx-2 my-2 " style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Detele Note</button>
                </div>
            </div>
            `;
    });

    let notesElm = document.getElementById('notes');
    if (notesElm.length != 0){
        notesElm.innerHTML = html;
    }
}

function deleteNote(index){
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);

    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function(){
    let inputVal = searchText.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        if (cardText.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});