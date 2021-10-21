
/* Exploring JS execution timings */
console.log("> First")
console.log("> Second")
setTimeout(() => console.log("> Third"), 0)
console.log("> Fourth")

/* Exploring promises */
// const first = () => console.log("> First")
// const second = () => console.log("> Second")
// const third = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("> Third")
//     resolve()
//   }, 0)
// })
// const fourth = () => console.log("> Fourth")

// first() // begin execution immediately 
// second() // begin execution immediately
// third.then(fourth) // finish execution of "third" before beginning execution of "fourth"

