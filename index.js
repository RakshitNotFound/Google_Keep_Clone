
// Input Bar
const inputBar = document.getElementById("inputBar");


// Input Note
const inputNote = document.createElement("div")
inputNote.classList.add("inputNote");

// Input Title
let inputTitle = document.createElement("h3");
inputTitle.id = "inputTitle";
inputTitle.contentEditable = true;
inputTitle.ariaPlaceholder = "Title";

// Input Body
let inputBody = document.createElement("p");
inputBody.id = "inputBody";
inputBody.contentEditable = true;
inputBody.ariaPlaceholder = "Take a Note...";

// Close Button
let inputCloseBtn = document.createElement("button");
inputCloseBtn.classList.add("closeBtn");
inputCloseBtn.textContent = "Close";

// Appending Items in Input Note
inputNote.appendChild(inputTitle);
inputNote.appendChild(inputBody);
inputNote.appendChild(inputCloseBtn);


// Start Writing Note just after opening
document.body.addEventListener("keydown", (event) => {
    if (event.target.classList.contains("body") && !event.target.classList.contains("blur")) {
        inputBar.replaceWith(inputNote);
        inputBody.focus();
    }
})

// Open Input Note
inputBar.addEventListener("click", () => {
    if (!document.body.classList.contains("blur")) {
        inputBar.replaceWith(inputNote);
        inputTitle.focus();
    }
});

// Input Title to input Body
inputTitle.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        inputBody.focus();
    }
})

// Notes Wrapper
const notesWrapper = document.getElementById("notesWrapper");


// Create Note Popup
const createNotePopup = (note) => {

    // Defining parameter note things
    let noteTitle = note.children[0];
    let noteBody = note.children[1];

    // Note Popup
    const notePopup = document.createElement("div");
    notePopup.classList.add("notePopup");

    // Note Popup Title
    let notePopupTitle = document.createElement("h3");
    notePopupTitle.textContent = noteTitle.textContent;
    notePopupTitle.contentEditable = true;

    // Note Popup Body
    let notePopupBody = document.createElement("p");
    notePopupBody.innerHTML = noteBody.innerHTML;
    notePopupBody.contentEditable = true;

    // Close Btn
    let closeBtn = document.createElement("button");
    closeBtn.classList.add("closeBtn");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", () => {
        noteTitle.textContent = notePopupTitle.textContent;
        noteBody.innerHTML = notePopupBody.innerHTML;
        notePopup.remove();
        document.body.classList.remove("blur");
        inputBar.removeAttribute("disabled");
    });

    // Appending Items in Note Popup
    notePopup.appendChild(notePopupTitle);
    notePopup.appendChild(notePopupBody);
    notePopup.appendChild(closeBtn);

    // Making background blur
    document.body.classList.add("blur");
    inputBar.disabled = "true";
    notePopupTitle.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
            event.preventDefault();
            notePopupBody.focus();
        }
    })


    // Appending Note Popup in body
    document.body.insertAdjacentElement('afterend', notePopup);

}

// Create New Note Function
const createNote = () => {

    // Note
    const note = document.createElement("div");
    note.classList.add("note");

    // Note Title
    let noteTitle = document.createElement("h3");
    noteTitle.textContent = inputTitle.textContent;

    // Note Body
    let noteBody = document.createElement("p");
    noteBody.innerHTML = inputBody.innerHTML;

    // Note Delete Btn
    let deleteBtn = document.createElement("div");
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    deleteBtn.addEventListener("click", ()=>{
        console.log("clicked")
        let deletedNote = deleteBtn.parentElement;
        deletedNote.remove();
    });

    // Appending Items in Note
    note.appendChild(noteTitle);
    note.appendChild(noteBody);
    note.appendChild(deleteBtn);

    // Event Listeners
    note.addEventListener("click", (event) => {
        console.log(event.target);
        if(!event.target.classList.contains("fa-trash")){
            createNotePopup(note);
        }
    });

    // Appending Note in Notes Wrapper
    notesWrapper.appendChild(note);
}


// Input Close Button Functionality
inputCloseBtn.addEventListener("click", () => {
    if (inputTitle.textContent == "" && inputBody.textContent == "") {
        inputNote.replaceWith(inputBar);
        return;
    }
    createNote();
    inputTitle.textContent = "";
    inputBody.textContent = "";
    inputNote.replaceWith(inputBar);
})
