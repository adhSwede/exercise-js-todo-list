// References
const tdList = document.querySelector(".td-list");
const newLi = document.querySelector(".new-li");
const submitBtn = document.querySelector(".submit-btn");
const deleteIcon = document.querySelector(".delete-icon");

// Example items
newListItem("Mjölk");
newListItem("Ägg");

// Add new Item on submit
submitBtn.addEventListener("click", (event) => {
  const nL = newLi.value;
  newListItem(String(nL).charAt(0).toUpperCase() + String(nL).slice(1));
  newLi.value = "";
  event.preventDefault();
});

// Custom checkbox
tdList.addEventListener("click", (event) => {
  const icon = event.target;
  if (icon.classList.contains("checkbox-icon")) {
    icon.textContent =
      icon.textContent === "check_box_outline_blank"
        ? "check_box"
        : "check_box_outline_blank";
    icon.classList.toggle("checked");
  }
});

const deleteParentElement = (event) => {
  const parEl = event.target.parentNode;
  parEl.remove();
};
