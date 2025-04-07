const input = document.getElementById('note-input');
const addBtn = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');
const offlineStatus = document.getElementById('offline-status');

function updateOfflineStatus() {
  offlineStatus.style.display = navigator.onLine ? 'none' : 'block';
}

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;
    li.onclick = () => alert(note);
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Удалить';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      loadNotes();
    };
    li.appendChild(delBtn);
    notesList.appendChild(li);
  });
}

addBtn.onclick = () => {
  const note = input.value.trim();
  if (note) {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
    input.value = '';
    loadNotes();
  }
};

window.addEventListener('load', () => {
  loadNotes();
  updateOfflineStatus();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
});

window.addEventListener('online', updateOfflineStatus);
window.addEventListener('offline', updateOfflineStatus);
