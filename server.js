const express = require('express');
const app = express();
app.listen(3000);
app.use(express.json());
app.use(express.static('public'));
app.get("/", (req, res)=>{
    res.send({message: "Hello"})
});
let students = [
    {
        "id": 1,
        "name": "John",
        "age":19,
        "province":"Kompot"
    },
    {
        "id": 2,
        "name": "Rady",
        "age":33,
        "province":"BMC"
    },
    {
        "id": 3,
        "name": "KS",
        "age":33,
        "province":"KPC"
    }
];
app.get("/students", (req, res)=>{
        // console.log(students[students.length - 1].id)
    res.send(
        {
            message: "List all students",
             data: students
        })
})
app.post("/students", (req, res)=>{
    let newID = students.length ? students[students.length - 1].id + 1: 0;

    let student = {
        id :newID ,
        name:req.body.name,
        age:req.body.age,
        province:req.body.province,

}
let name = req.body.name;
let age = req.body.age;
let province = req.body.province
let message = "";
if(name == "" || !name) {
    message = "Please enter a name";
} else if (age == "" || !age) {
    message = "Please enter a age";
} else if (province == "" || !province) {
    message = "Please enter a province";
}

if (message == "") {
    students.push(student);
    return res.send({message:"create new student",data: student});
} else {
    return res.send({message: message});
}


});

app.put("/students/:id", (req, res)=>{
    // console.log(req.params.id)
    let id = req.params.id
    let name = req.body.name;
    let age = req.body.age;
    let province = req.body.province
    let index = students.findIndex(student => student.id == id);
    if(index >= 0){
        let student = students[index];
        student.name = name;
        student.age = age;
        student.province = province;
        return res.send(students); 
    }
    else{
        return res.send({
            "message": "Is not found"
        })
    }
})


app.delete("/students/:id", (req, res)=>{
    // console.log(req.params.id)
    let id = req.params.id
    let name = req.body.name;
    let age = req.body.age;
    let province = req.body.province
    let index = students.findIndex(student => student.id == id);
    if(index >= 0){
        students.splice(index, 1);
        return res.send({message:"Delete successfully"}); 
    }
    else{
        return res.send({
            "message": "Invalid"
        })
    }
})

app.get('/students/:id',(req,res)=>{
    let id = req.params.id;
    let index = students.findIndex(student => student.id == id);
    if (index >= 0) {
        return res.send(students[index]);
    }
    res.send({message:"Invalid"});
});
