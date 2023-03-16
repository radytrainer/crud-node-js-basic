
const URL = "https://crud-node-js-basic.vercel.app/students";
// add students
function addStudent() {
    let student = {
        name: student_name.value,
        age: age.value,
        province: province.value
    }
    axios.post(URL, student)
        .then(res => {
            console.log({data: res.data, message: "Created"})
        });
    student_name.value = "";
    age.value = "";
    province.value = "";
    getStudent();
}

// DOM
function displayStudent(array) {
    
    document.querySelector('table').remove();
    let newTable = document.createElement('table');
    for(let student of array) {
        let tr = document.createElement('tr');
        let td_id = document.createElement('td');
        let td_name = document.createElement('td');
        let td_age = document.createElement('td');
        let td_province = document.createElement('td');
        let td_action = document.createElement('td');

        let btn_delete = document.createElement('button');
        btn_delete.setAttribute('class', 'delete');
        btn_delete.setAttribute('data-id', student.id);

        let btn_edit = document.createElement('button');
        btn_edit.setAttribute('class', 'edit');
        btn_edit.setAttribute('data-id', student.id);

        td_id.textContent = student.id;
        td_age.textContent = student.age;
        td_name.textContent = student.name;
        td_province.textContent = student.province;
        btn_delete.textContent = "Delete";
        btn_edit.textContent = "Edit";

        td_action.appendChild(btn_delete);
        td_action.appendChild(btn_edit);

        tr.appendChild(td_id);
        tr.appendChild(td_name);
        tr.appendChild(td_age);
        tr.appendChild(td_province);
        tr.appendChild(td_action);
       
        newTable.appendChild(tr);
    }
    container.appendChild(newTable);
}
// Get all students
function getStudent() {
    axios.get(URL)
        .then(res => {
            let students = res.data.data;
            displayStudent(students);
            const btnDeletes = document.querySelectorAll('.delete');
            const btnEdits = document.querySelectorAll('.edit');
            for(let btnDelete of btnDeletes) {
                btnDelete.addEventListener('click', (e) => {
                    deleteStudent(btnDelete.dataset.id);
                })
            }

            for(let btnEdit of btnEdits) {
                btnEdit.addEventListener('click', (e) => {
                    editStudent(btnEdit.dataset.id);
                })
            }
            
        });


}

// delete
function deleteStudent(id) {
    axios.delete(URL + "/" + id)
    .then(res => {
        console.log({data: res.data, message: "Deleted"})
    });
    getStudent()
}


// display data inform
function displayDataInForm(student) {
    student_name.value = student.name;
    age.value = student.age;
    province.value = student.province;
    student_id.value = student.id;
}


// edit
function editStudent(id) {
    axios.get(URL + "/" + id)
         .then(res => {
            displayDataInForm(res.data);
        });
    visible(btn_update, "block");
    visible(btn_add, "none");
}


// update 

function updateStudent() {
    let id = student_id.value;
    let student = {
        name: student_name.value,
        age: age.value,
        province: province.value
    }
    axios.put(URL + "/" + id, student)
        .then(res => {
            console.log({message: "Updated!"})
        });
    student_name.value = "";
    age.value = "";
    province.value = "";
    getStudent();

    visible(btn_update, "none");
    visible(btn_add, "block");
}

function visible(btn, type) {
    btn.style.display = type;
}
const container = document.querySelector('.container');
const student_name = document.querySelector('#name');
const age = document.querySelector('#age');
const province = document.querySelector('#province');
const student_id = document.querySelector('#student_id');
const btn_add = document.querySelector('#btn_add');
const btn_update = document.querySelector('#btn_update');
visible(btn_update, "none");


btn_add.addEventListener('click', addStudent);
btn_update.addEventListener('click', updateStudent)

window.addEventListener('DOMContentLoaded', (event) => {
    getStudent();
});
