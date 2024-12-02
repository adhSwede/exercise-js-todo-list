// References
const lightSwitch = document.querySelector(".light-switch");
const body = document.querySelector("body");
const main = document.querySelector(".td-note");
const form = document.querySelector(".add-form");
const tdList = document.querySelector(".td-list");
const newLi = document.querySelector(".new-li");
const newAuthor = document.querySelector(".new-author");
const submitBtn = document.querySelector(".submit-btn");
const sortBySelect = document.querySelector(".sort-by");

// Save the list to localStorage
const saveListToLocalStorage = () => {
  const items = [...tdList.querySelectorAll(".list-item")].map((li) => ({
    text: li.querySelector(".li-text").textContent,
    author: li.querySelector(".author").textContent,
    timestamp: li.querySelector(".timestamp").textContent,
  }));
  localStorage.setItem("todoList", JSON.stringify(items));
};

// Load saved items
document.addEventListener("DOMContentLoaded", () => {
  let savedList = [];
  try {
    savedList = JSON.parse(localStorage.getItem("todoList")) || [];
  } catch (error) {
    console.error("Could not read from localStorage:", error);
  }

  savedList.forEach((item) => {
    if (item.text && item.author && item.timestamp) {
      newListItem(item.text, item.author, item.timestamp);
    }
  });

  // Get Dark/Light mode setting
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    darkModeSwitch();
  }
});

// Dark Mode Toggle
const darkModeSwitch = () => {
  const isDarkMode = body.classList.toggle("body-dark-mode");
  main.classList.toggle("main-dark-mode");
  sortBySelect.classList.toggle("select-dark");

  lightSwitch.style.color = isDarkMode ? "#e6e6e6" : "#000";
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
};

lightSwitch.addEventListener("click", () => {
  darkModeSwitch();
});

// Create a new list item
const newListItem = (
  itemText,
  author,
  timestamp = new Date().toLocaleString()
) => {
  tdList.insertAdjacentHTML(
    "beforeend",
    `<li class="list-item">
      <span class="li-text">${itemText}</span><br>
      <span class="author">${author}</span>
      <span class="timestamp">${timestamp}</span>
      <span class="material-icons edit-icon">edit</span>
      <span class="material-icons close-icon">close</span>
    </li>`
  );
  saveListToLocalStorage();
};

// Add new Item on submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskText = newLi.value.trim();
  const authorName = newAuthor.value.trim();

  if (taskText && authorName) {
    newListItem(
      taskText.charAt(0).toUpperCase() + taskText.slice(1),
      authorName
    );
    newLi.value = "";
    newAuthor.value = "";
  }
});

// Delete list item
const deleteItem = (event) => {
  const item = event.target.closest(".list-item");
  if (item) {
    item.remove();
    saveListToLocalStorage();
  }
};

// Edit list item
const editItem = (event) => {
  const item = event.target.closest(".list-item");
  if (!item) return;

  const liText = item.querySelector(".li-text");
  const authorText = item.querySelector(".author");
  const prevText = liText.textContent;
  const prevAuthor = authorText.textContent;

  liText.innerHTML = `<input type="text" value="${prevText}" class="edit-input">`;
  authorText.innerHTML = `<input type="text" value="${prevAuthor}" class="edit-author-input">`;

  const editInput = liText.querySelector(".edit-input");
  const editAuthorInput = authorText.querySelector(".edit-author-input");

  // Save changes on blur
  const saveEdit = () => {
    liText.textContent = editInput.value || prevText;
    authorText.textContent = editAuthorInput.value || prevAuthor;
    saveListToLocalStorage();
  };

  editInput.addEventListener("blur", saveEdit);
  editAuthorInput.addEventListener("blur", saveEdit);

  editInput.focus();
};

// Sort entries
const sortEntries = (criteria) => {
  const items = [...tdList.querySelectorAll(".list-item")];

  if (criteria === "author") {
    items.sort((a, b) => {
      const authorA = a.querySelector(".author").textContent.toLowerCase();
      const authorB = b.querySelector(".author").textContent.toLowerCase();
      return authorA.localeCompare(authorB);
    });
  } else if (criteria === "timestamp") {
    items.sort((a, b) => {
      const timestampA = new Date(a.querySelector(".timestamp").textContent);
      const timestampB = new Date(b.querySelector(".timestamp").textContent);
      return timestampA - timestampB;
    });
  }

  tdList.innerHTML = "";
  items.forEach((item) => tdList.appendChild(item));
  saveListToLocalStorage();
};

// Handle sorting options change
sortBySelect.addEventListener("change", (event) => {
  const criteria = event.target.value;
  sortEntries(criteria);
});

// Event delegation for icons
tdList.addEventListener("click", (event) => {
  const icon = event.target;
  if (icon.classList.contains("close-icon")) {
    deleteItem(event);
  } else if (icon.classList.contains("edit-icon")) {
    editItem(event);
  }
});
