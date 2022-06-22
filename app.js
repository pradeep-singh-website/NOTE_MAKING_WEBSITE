console.log("Notes App");
showNotes();
// listening to the event when user clicks on the button
// and storing it to the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addText = document.getElementById("addText");
  let addTitle = document.getElementById("addTitle");
  let notes = localStorage.getItem("notes");
  // notes is the key
  if (notes == null) {
    notesObj = []; // this is a array to store the notes
  } else {
    notesObj = JSON.parse(notes);
  }
  let Myobj={
    title:addTitle.value,
    text:addText.value
  }
  //notesObj.push(addText.value);
  notesObj.push(Myobj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addTitle.value = "";
  addText.value = "";
  console.log(notesObj);
  showNotes();
});

// To show the notes that we wrote
function showNotes() {
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-text"> ${element.text}</p>
                <button type="button" id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            </div>
        </div>`;
  });
  let noteElement = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElement.innerHTML = html;
  } else {
    noteElement.innerHTML = `Nothing to show as notes || Use "Add a Note" || to enter you notes.`;
  }
}

// function to delete the note
// we will be requiring the index of the note

function deleteNote(index) {
  //console.log("Deleting note", index);
  // again we'll make the notesobj array
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1); // For deleting
  // removed from notesobj but updation of localStorage is required
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

// Function for searching in the notes

let Search = document.getElementById("Search");
Search.addEventListener("input", function () {
  let searchTxt = Search.value.toLowerCase();
  // This is the text entered in the seacrh bar
  //console.log("User entered something", searchTxt);

  let notecard = document.getElementsByClassName("noteCard");
  // This will take all the note cards
  Array.from(notecard).forEach(function (element) {
    // converting notecard to array
    let paraValue = element.getElementsByTagName("p")[0].innerText.toLowerCase();  
    let headValue = element.getElementsByTagName("h5")[0].innerText.toLowerCase();  
    if (paraValue.includes(searchTxt) || (headValue.includes(searchTxt))) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});
