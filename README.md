<head>
<style>
    .img, figcaption, h1{
        display: flex;
        justify-content:center;
    }
</style>
</head>
<header><h1>A simple todo-app. <h2>It uses the browser local storage to save the tasks and their status between browser sessions.</header>
<main><article><section></section>
<br>
<section>
<h3>Input fields:</h3>
<p>"Search..." - Searches among the entered tasks. It is specific and case sensitive. Press enter or the magnifying glass-button.
"Add task..." - Enter what you want to add to the list. Press enter or the plus sign-button.</p>

<h3>List:</h3>
<p>List - The list will be scrollable if there are more items than fits the height.
List items - Click the list items to toggle their status. Longer text will be wrapped.</p>

<h3>Bottom buttons:</h3>
<p>"Clear list" - Clears the local array, list and local storage. You will be prompted to
Sort buttons - Allows you to sort the items in an ascending or descending order. It does not mutate the original array
"Reset/Reload" - Unsort the list if it is sorted, the entries will appear in the order they were entered.</p>

<h3>Features:</h3>
<p>Empty input - If you try to add an empty task the input field will flash red and the task will not be added to the list.
Double input - If you try to add a task that is already in the list the input field will flash yellow and the task will not be added to the list. It is not case sensitive.</p>

</section>
<section class="img">
<figure><img alt="Overview with added items" src="./img/image.png" width="200px"><figcaption>App overview with added items</figcaption></figure>
<figure><img alt="Search example" src="./img/image-1.png" width="200px">  <figcaption>Search example</figcaption></figure>
</section>
</article>
</main>
