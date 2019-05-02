

const getDog = function(){
   return fetch('http://localhost:3000/dogs')
        .then(resp=>resp.json())
}

//get one Dog
const registeredDog = function(dog){
     const dogTable = document.querySelector('#table-body')
     const dogTableEl = document.createElement('tr')
     dogTableEl.innerHTML = `

        <td> ${dog.name}</td> 
        <td> ${dog.breed}</td> 
        <td> ${dog.sex}</td> <td>
        <button id="edit">Edit</button></td>
     `
     dogTable.append(dogTableEl)
}

//get multiple Dogs

const registeredDogs = function(dogs){
    dogs.forEach(registeredDog)
}

getDog()
    .then(registeredDogs)


