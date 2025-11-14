/*
Function to select an element. 
selects a list of elements and returns either the list or a single element in the list.
argument: an element selector
return:
    a: if the node list is longer than one item return the node list
    b: if the node list contains one item return the one element
*/
function $(_element)
{
    let e = document.querySelectorAll(_element)
    return (e.length > 1)?e:e[0]
};

// ===== DOM Selectors =====
const textareaEl = document.querySelector('textarea');
const addBtn = document.querySelectorAll('button')[0];
const bulkDeleteBtn = document.querySelectorAll('button')[1];
const selectAllBtn = document.getElementById('all');
const confirmBtn = document.getElementById('confirm');
const outputSection = document.getElementById('output');

// ===== Load posts from local storage on page load =====
/*
    Check to see if `posts` exists in local storage
    if it does parse the JSON string
    loop through the returned array and add each string to the page as innerHTML.
*/
if(localStorage.getItem('posts')) {
    var posts = JSON.parse(localStorage.getItem('posts'));
    posts.forEach(function(value) {
        outputSection.innerHTML += value;
    });
}

// ===== Add button click handler =====
/*
    When the `Add` button is clicked:
        creates a div for a post
        gives it a `post` class
        creates a <p> tag
        add the textareas value to the <p> tag's innerHTML
        create a <time> element
        add the system time to the time elements innerHTML
        add the <time> and <p> to the <div>
        add the <div> to the #output <section>
        create an array of the post's outerHTML strings
        Store the array in local storage as a JSON String
*/
addBtn.addEventListener(`click`, e=>{
    let post = document.createElement(`div`);
    post.setAttribute(`class`,`post`);  
    let check = document.createElement(`input`);
    check.setAttribute(`type`,`checkbox`)
    check.classList.add(`hidden`)
    let p = document.createElement(`p`);
    p.innerHTML = textareaEl.value
    let time = document.createElement(`time`);
    time.innerHTML = new Date().toLocaleTimeString();
    post.appendChild(check)
    post.appendChild(time)
    post.appendChild(p)

    outputSection.appendChild(post)

    let array = Array.from($(`.post`)).map(value=>value.outerHTML)
    
    localStorage.setItem(`posts`,JSON.stringify(array))
})

// ===== Bulk Delete button click handler =====
/*
    When the `Bulk Delete` button is clicked:
        Show all checkboxes by removing the 'hidden' class
        Show the "Select All" and "Confirm" buttons
*/
bulkDeleteBtn.addEventListener(`click`, e=>{
    let checkboxes = Array.from(document.querySelectorAll('.post input[type="checkbox"]'));
    checkboxes.forEach((checkbox) => {
        checkbox.classList.remove('hidden');
    });
    selectAllBtn.classList.remove('hidden');
    confirmBtn.classList.remove('hidden');
});

// ===== Select All button click handler =====
/*
    When the `Select All` button is clicked:
        Toggle the checked state of all checkboxes
*/
selectAllBtn.addEventListener(`click`, e=>{
    let checkboxes = Array.from(document.querySelectorAll('.post input[type="checkbox"]'));
    let allChecked = checkboxes.every(checkbox => checkbox.checked);
    checkboxes.forEach((checkbox) => {
        checkbox.checked = !allChecked;
    });
});

// ===== Confirm button click handler =====
/*
    When the `Confirm` button is clicked:
        Get all checked checkboxes
        Get all unchecked posts (which should remain)
        Update local storage with only unchecked posts
        Remove checked posts from the DOM
        Hide checkboxes, "Select All", and "Confirm" buttons
*/
confirmBtn.addEventListener(`click`, e=>{
    let posts = Array.from(document.querySelectorAll('.post'));
    let uncheckedPosts = posts.filter(post => {
        let checkbox = post.querySelector('input[type="checkbox"]');
        return !checkbox.checked;
    }).map(post => post.outerHTML);
    
    // Update local storage with unchecked posts
    localStorage.setItem(`posts`, JSON.stringify(uncheckedPosts));
    
    // Remove checked posts from DOM
    posts.forEach(post => {
        let checkbox = post.querySelector('input[type="checkbox"]');
        if(checkbox.checked) {
            post.remove();
        }
    });
    
    // Hide checkboxes, "Select All", and "Confirm" buttons
    let checkboxes = Array.from(document.querySelectorAll('.post input[type="checkbox"]'));
    checkboxes.forEach((checkbox) => {
        checkbox.classList.add('hidden');
    });
    selectAllBtn.classList.add('hidden');
    confirmBtn.classList.add('hidden');
});