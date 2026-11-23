const input = document.getElementById("recipe-id");
const getBtn = document.getElementById("get-btn");
const getStatus = document.getElementById("status");
const recipeArea = document.getElementById("recipe");
const dishInput = document.getElementById("dish-name");
const postBtn = document.getElementById("post-btn");
const postStatus = document.getElementById("post-status");
const savedArea = document.getElementById("saved");

async function getRecipe() {
    recipeArea.textContent = "";

    if( input.value === "") {
        getStatus.textContent = "Type a number first.";
        return;
    }
    try{
    getStatus.textContent = "Loading...";

    const response = await fetch(`https://dummyjson.com/recipes/${input.value}`);

    if(!response.ok) {
        getStatus.textContent = "No recipe with that number. Try 1 to 50.";
        return;
    }
    const recipe = await response.json();{recipe};
    console.log(recipe);

    getStatus.textContent = "";

    const card = document.createElement("div");
    card.className = "card p-3 mb-5 w-50";

    const img = document.createElement("img");
    img.src = recipe.image;
    img.alt = recipe.name;
    img.className = "rounded-2";
    card.prepend(img);
    
    const title = document.createElement("h2");
    title.textContent = recipe.name;
    card.appendChild(title);

    // Cuisine 
    const cuisine = document.createElement("p");
    cuisine.textContent = `Cuisine: ${recipe.cuisine}`;
    card.appendChild(cuisine);

       
        const ingredientList = document.createElement("ul");
        ingredientList.className= "text-start mt-2";

    recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientList.appendChild(li);
    
    });

    card.appendChild(ingredientList);
    recipeArea.appendChild(card);
    
    input.value = "";
    }catch(error) {
        console.error(error);
}
}
getBtn.addEventListener("click", getRecipe);

// POST - Add a dish
async function addDish() {
    savedArea.textContent = "";

    if (dishInput.value === "") {
        postStatus.textContent = "Type a dish name first.";
        return;
    }
    try {
    postStatus.textContent = "Sending...."

    const response = await fetch("https://dummyjson.com/recipes/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: dishInput.value })
    });

    if(!response.ok) {
        postStatus.textContent = "The server didn't add it. Try again.";
    }
const newDish = await response.json();
console.log(newDish);
postStatus.textContent = "";

const message = document.createElement("p");
message.className = "alert alert-success";
message.textContent = `Added ${newDish.name} as recipe #${newDish.id}`;
savedArea.appendChild(message);

dishInput.value = "";
    
}catch(error) {
    console.error(error);
}
}
postBtn.addEventListener("click", addDish);