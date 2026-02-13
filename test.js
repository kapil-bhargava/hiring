let applicants = [{
    name: "Rohan"
},
{
    name: "Tina"
}
]

for (let i = 0; i < applicants.length; i++) {
    applicants[i].title = "jobData.title"
}

console.log(applicants)