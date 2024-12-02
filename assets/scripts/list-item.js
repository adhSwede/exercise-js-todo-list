export default class newListItem {
  constructor(itemName) {
    this.itemName = itemName;

  itemOutput() {
    // This function will create a new list item element
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.textContent = this.itemName;

    // Return the element so it can be added to the DOM
    return li;
  }
}
