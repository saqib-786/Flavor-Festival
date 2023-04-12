(async function(){
    const respons = await fetch('./recipes.json');
    const recipes = await respons.json();


    const inputElement = document.getElementById('userValue');
    const searchBtn = document.getElementById('search-btn');
    const recipeList = document.getElementById('recipeList');
    const detailsContainer = document.getElementById('details-container')

    // inputElement.addEventListener('input',()=>{
    //     let recipeContainer = document.getElementById('recipe-container');
    //     if(inputElement.value === ''){
    //         recipeContainer.innerHTML = '';
    //     }
        

    // })

    function loadRecipeDetails(details){
        detailsContainer.innerHTML = `
        <h2>${details.title}</h2>
        <ul> 
        ${details.ingredients.map((item)=>{
            return "<li>" + item + "</li>"
        }).join('')}
        <h3 id="instructions">Instructions</h3>
        <div id="instruction-box">${details.instructions}</div>
        </ul>
        `
    

    }

    function loadSearchResult(result){
        recipeList.innerHTML = "";
        result.forEach((item)=>{
            let li = document.createElement('li');
            li.setAttribute('class','listItem')
            let container = document.createElement('div');
            container.innerHTML = `<p class="title">${item.title}</p> <p>${item.description}</p>`;
            li.appendChild(container);
            recipeList.appendChild(li);

            li.addEventListener('click',()=>{
                loadRecipeDetails(item)

            })
        });

     

    }

    searchBtn.addEventListener('click',()=>{
        let query = inputElement.value;
       let result = recipes.filter((recipe)=>{
        return recipe.title.toLowerCase().includes(query) || recipe.ingredients.join('').toLowerCase().includes(query)

        });
        loadSearchResult(result)
        // console.log(result)


    

    })
    
})();


$(document).ready(function(){
    $('#search-btn').click(function(){
        $('body').css({
            backgroundImage: 'none'
        })
    })
})

let searchBtn = document.querySelector('#search-btn');

let inputElement = document.querySelector('#userValue');

inputElement.addEventListener('input',()=>{
    if(inputElement.value.length > 3){
        searchBtn.removeAttribute('disabled')
    }else{
        searchBtn.setAttribute('disabled','disabled')
    }
})


inputElement.addEventListener('input',()=>{
    let recipeList = document.getElementById('recipeList');
    let detailsContainer = document.getElementById('details-container');
    let body = document.querySelector('body');
    if(inputElement.value === ''){
        recipeList.innerText = '';
        detailsContainer.innerText = '';
        body.style.backgroundImage = 'url("./Images/Background Image.png")'
    }
})