const myForm = document.querySelector('#table-body')
const dogFormSubmit = document.querySelector('#dog-form')

//state
const state = {
    dogs: [],
    selectedDog: null
}

//render single dog
function renderDog(dog){
    // debugger
    const trEl = document.createElement('tr')
    trEl.innerHTML = `
        <td>${dog.name}</td> 
        <td>${dog.breed}</td> 
        <td>${dog.sex}</td> 
        <td><button class="edit-button">Edit</button></td>
    `
    //button to select the single dog
        const editBn = trEl.querySelector('.edit-button')
        editBn.addEventListener('click', function(){
        state.selectedDog = dog 
        // debugger
        dogFormSubmit.name.value = state.selectedDog.name
        dogFormSubmit.breed.value = state.selectedDog.breed
        dogFormSubmit.sex.value = state.selectedDog.sex
    })



    myForm.append(trEl)
}

//render multiple dogs
function renderDogs(){
    state.dogs.forEach(renderDog)
}

//update dog on the page
function updateDogPage(){
    dogFormSubmit.addEventListener('submit', function(event){
        event.preventDefault()
        
        state.selectedDog.name = dogFormSubmit.name.value
        state.selectedDog.breed = dogFormSubmit.breed.value
        state.selectedDog.sex = dogFormSubmit.sex.value
        
        myForm.innerHTML = ''
        updateDogServer(state.selectedDog)
        renderDogs(state.dogs)
        // createDogServer(dog)
        //     .then(renderDog)
        dogFormSubmit.reset()
    })
}



//update dog in state




//update dog on the server

//create dog using form
// function createDog(){
//     dogFormSubmit.addEventListener('submit', function(event){
//         event.preventDefault()
//         dog = {
//             name: dogFormSubmit.name.value,
//             breed: dogFormSubmit.breed.value,
//             sex: dogFormSubmit.sex.value
//         }
//         createDogServer(dog)
//             .then(renderDog)
//         dogFormSubmit.reset()
//     })
// }

// function selectDog(){
//     const editBn = myForm.querySelector('.edit-button')
//     editBn.addEventListener('click', function(){
//         state.selectedDog.name = dogFormSubmit.name.value
//         state.selectedDog.breed = dogFormSubmit.breed.value
//         state.selectedDog.sex = dogFormSubmit.sex.value
//     })
// }


//initialise the app
    function init(){
        getDogsFromServer()
            .then(function(dogs){
                state.dogs = dogs
                renderDogs()
            })
        // createDog()
        updateDogPage()
}

init()
