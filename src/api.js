//stuff from the server
const DOGS_URL = 'http://localhost:3000/dogs'

//get dogs from the server
function getDogsFromServer(){
    return fetch(DOGS_URL)
        .then(resp => resp.json())
}

//create dog on the server
function createDogServer(dog){
    return fetch(DOGS_URL, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(dog)
    })
    .then(resp => resp.json())
}

//update 
function updateDogServer(selectedDog){
    return fetch(DOGS_URL + `/${selectedDog.id}`, {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(selectedDog)
    })
    .then(resp => resp.json())
}