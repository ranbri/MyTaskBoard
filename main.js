function randomColor(){ 
    let r = Math.floor(Math.random()*55);
    let g = Math.floor(Math.random()*55);
    let b = Math.floor(Math.random()*255);
    let x = "rgb(" + r + "," + g + "," + b + ")";
    let myH1 = document.getElementById("myH1");
    myH1.style.color = x;
}
randomColor();

function makeNotes() {
    let notes = getNotes();
    let container = document.getElementById("container");

    container.innerHTML = "";
    let count = 0;

    for (let note of notes) {
        container.innerHTML += "<div id='note' class='fade-in " + count + "'> <button id=" +
        count + " onclick='deleteNote(this)' type='button' class='close' aria-label='Close'><span class='glyphicon glyphicon-remove'></span></button>   <textarea class=" + 
        count + " readonly>" + note.task + "</textarea><br>" + 
        note.date + "<br>" + 
        (note.time != "" ? note.time : "") + 
        "</div>";
        count++;
    }

}

function checkValid(task, date) {
    if (task.value == "") {
        alert("Please Fill The Task Box**");
        return false;
    }
    if (date.value == "") {
        alert("Please Fill The Date Box**");
        return false;
    }
    return true;
}

function clearInputBox() {
    let inputs = document.getElementById("inputBox").getElementsByTagName("INPUT");
    for (let input of inputs) {
        input.value = "";
    }
}

function createNote(task, date, time) {
    let note = {
        task: task.value,
        date: date.value,
        time: time.value
    };
    return note;
}
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
    makeNotes();
}

function addNote() {
    let notes = getNotes();
    let taskBox = document.getElementById("taskBox");
    let dateBox = document.getElementById("dateBox");
    let timeBox = document.getElementById("timeBox");

    let valid = checkValid(taskBox, dateBox);
    if (valid) {
    let note = createNote(taskBox,dateBox, timeBox);
    notes.push(note);
    saveNotes(notes);

    makeNotes();
    clearInputBox();
    }
}

function getNotes() {
    let notes;
    if (localStorage.getItem("notes") == null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    return notes;
}

function deleteNote(button) {
    let notes = getNotes();
    notes.splice(button.id, 1);
    saveNotes(notes);
    makeNotes();
}

