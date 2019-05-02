class API {
    static URL = 'http://localhost:3000/dogs'  

    static getDogs = () => 
    fetch(this.URL)
        .then(resp => resp.json())

    static updateDogServer = () => {
    fetch(this.URL + `/${state.selectedDog.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(state.selectedDog)
    }).then(resp => resp.json())

    }
}





// const URL = 'http://localhost:3000/dogs'

// // get dogs from server 

// const getDogs = () => 
//     fetch(URL)
//         .then(resp => resp.json())

//         // update dog server

// const updateDogServer = () => {
//     fetch(URL + `/${state.selectedDog.id}`, {
//         method: 'PATCH',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify(state.selectedDog)
//     }).then(resp => resp.json())
// }