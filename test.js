// let applicants = [{
//     name: "Rohan"
// },
// {
//     name: "Tina"
// }
// ]

// for (let i = 0; i < applicants.length; i++) {
//     applicants[i].title = "jobData.title"
// }

// console.log(applicants)

const jobs = [{
    name: "Rohan",
    class: 5
}, {
    name: "pankaj",
    class: 5
}, {
    name: "Sumit",
    class: 3
}]

const data = jobs.filter((x)=> x.class==5)

console.log(data)