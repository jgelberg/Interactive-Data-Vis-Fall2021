// console.log('hello world');

// /* string */
// const myName = "ellie";
// let neighborhood = "park slope";

// /* numbers */
// const favNumber = 13;

// /* boolean */ 
// const cool = true;

// /* arrays */
// const myArray = [1, 2, 3, 4] // set
// const mixed = [1, "thing", 2]

// /* object */
// const myObject = {
//   name: "ellie",
//   zip: 11215,
// } // dictionary


// const newArray = myArray.map(data => data + " thing")
// const newArray = myArray.forEach(data => console.log(data))
// console.log('myArray :>> ', myArray);
// console.log('newArray :>> ', newArray);

// const filtered = myArray.filter(booger => booger % 2 === 0)
// console.log('filtered :>> ', filtered);
// console.log('filtered.length :>> ', filtered.length);


const label = document.getElementById("name-label")
const submit = document.getElementById("name-submit")

function updateName() {
  const username = document.getElementById("name-input").value
  // window.alert("Hello " + document.getElementById("name-input").value + ",welcome to class")
  window.alert(`Hello ${username}, welcome to class`)
  label.innerText = `Your name is ${username}. Change it here:`
  submit.innerText = "Change"
}
