// Get the search input element, search button element and match count element
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const matchCount = document.getElementById('match-count');

let highlights = []; // Array to store all highlighted elements
let currentIndex = -1; // Index of the currently selected highlight

// Add an event listener to the search button element
searchBtn.addEventListener('click', searchHandler);

// Add an event listener to the enter key on the search input element
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    searchHandler();
  }
});

function searchHandler() {
  resetHighlights(); // Clear previous highlights
  currentIndex = -1; // Reset the current index
  // Get the search term entered by the user
  const searchTerm = searchInput.value;

  // Get all the text nodes in the HTML document
  const textNodes = getTextNodes(document.body);

  // Loop through all the text nodes
  let count = 0; // variable to store the match count
  for (let i = 0; i < textNodes.length; i++) {
    const node = textNodes[i];
    const text = node.textContent;
    const replacedText = text.replace(new RegExp(searchTerm, 'gi'), '<span class="highlight">$&</span>');
    // Replace the text node with a new HTML element that highlights the search term
    if (replacedText !== text) {
      const newNode = document.createElement('span');
      newNode.innerHTML = replacedText;
      node.parentNode.replaceChild(newNode, node);
      highlights.push(newNode); // Add the newly highlighted element to the array
      count++; // Increment the match count
    }
  }
  
  // Display the match count
  matchCount.textContent = `(${count} matches found)`;

  // Scroll to the first highlighted element
  if (highlights.length > 0) {
    currentIndex = 0; // Select the first highlighted element
    scrollToHighlight(highlights[currentIndex]);
  }
}

// Add an event listener to the next button element
nextBtn.addEventListener('click', function () {
  if (highlights.length === 0) {
    return;
  }

  currentIndex++; // Move to the next highlight
  if (currentIndex >= highlights.length) {
    currentIndex = 0; // Wrap around to the first highlight
  }
  scrollToHighlight(highlights[currentIndex]);
});

// Add an event listener to the previous button element
prevBtn.addEventListener('click', function () {
  if (highlights.length === 0) {
    return;
  }

  currentIndex--; // Move to the previous highlight
  if (currentIndex < 0) {
    currentIndex = highlights.length - 1; // Wrap around to the last highlight
  }
  scrollToHighlight(highlights[currentIndex]);
});

function scrollToHighlight(element) {
  // Helper function to scroll to the highlighted element
  const rect = element.getBoundingClientRect();
  window.scrollTo({
    top: rect.top + window.pageYOffset - 100, // subtract 100 for better view
    left: rect.left + window.pageXOffset,
    behavior: 'smooth'
  });
}
/*inserted above*/

function getTextNodes(node) {
  // Helper function to get all the text nodes in a DOM subtree
  const nodes = [];

  if (node.nodeType === Node.TEXT_NODE) {
    nodes.push(node);
  } else {
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      nodes.push(...getTextNodes(children[i]));
    }
  }

  return nodes;
}

function resetHighlights() {
  // Function to clear all previous highlights
  for (let i = 0; i < highlights.length; i++) {
    const node = highlights[i];
    const parent = node.parentNode;
    parent.replaceChild(document.createTextNode(node.textContent), node);
  }
  highlights = []; // Clear the highlights array
}

// Add CSS styles for the highlighted text
const style = document.createElement('style');
style.innerHTML = '.highlight { background-color: yellow; }';
document.head.appendChild(style);
