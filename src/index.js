const dogForm = document.querySelector('#dog-form')
const table = document.querySelector('#table-body')
const URL = 'http://localhost:3000/dogs'


// client side 

// add dog
const displayDog = dog => {
    const newEl = document.createElement('tr')
    newEl.innerHTML = `
        <td>*${dog.name}*</td> 
        <td>*${dog.breed}*</td> 
        <td>*${dog.sex}*</td> 
        <td id='edit-btn'><button>Edit</button></td>
    `

    const editBtn =  newEl.querySelector('#edit-btn')
    editBtn.addEventListener('click', () => {

        dogForm.name.value = dog.name
        dogForm.breed.value = dog.breed
        dogForm.sex.value = dog.sex 

        dogForm.addEventListener('submit', (e) => {
            e.preventDefault()
            
            newEl.innerHTML = `
                <td>*${dogForm.name.value}*</td> 
                <td>*${dogForm.breed.value}*</td> 
                <td>*${dogForm.sex.value}*</td> 
                <td id='edit-btn'><button>Edit</button></td>
            `

            dog.name = dogForm.name.value
            dog.breed = dogForm.breed.value
            dog.sex = dogForm.sex.value

            editDog(dog)
            dogForm.reset()
    
            })
    
        })

    table.append(newEl)

}

// add dogs
const displayDogs = dogs => {
   dogs.forEach(displayDog)
    
}

document.addEventListener('DOMContentLoaded', () => {
    // render list of already registered dogs 
    getDogs()
        .then(displayDogs)
})

// server
const getDogs = () => {
    return fetch(URL)
        .then(resp => resp.json())
        
}

const editDog = (dog) => {
    return fetch(URL + `/${dog.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(dog)
    }).then(resp => resp.json())
}
