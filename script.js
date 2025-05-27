const students = [];

document.getElementById("studentform").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name");
    const lastname = document.getElementById("lastname");
    const grade = document.getElementById("grade");

    let isValid = true;

    if (!name.value.trim()) {
        name.setCustomValidity("Por favor, complete el campo 'Nombre'.");
        name.reportValidity();
        isValid = false;
    } else {
        name.setCustomValidity("");
    }

    if (!lastname.value.trim()) {
        lastname.setCustomValidity("Por favor, complete el campo 'Apellido'.");
        lastname.reportValidity();
        isValid = false;
    } else {
        lastname.setCustomValidity("");
    }

    const gradeValue = parseFloat(grade.value);
    if (isNaN(gradeValue) || gradeValue < 1 || gradeValue > 7) {
        grade.setCustomValidity("Por favor, ingrese una calificación válida entre 1.0 y 7.0.");
        grade.reportValidity();
        isValid = false;
    } else {
        grade.setCustomValidity("");
    }

    if (!isValid) return;

    const student = { name: name.value.trim(), lastname: lastname.value.trim(), grade: gradeValue };
    students.push(student);

    addStudentToTable(student);

    calculateAverage();
    updateStats();

    this.reset();
});

const tablebody = document.querySelector("#studenttable tbody");

function addStudentToTable(student) {
    const row = document.createElement("tr");
    const index = students.length - 1;
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastname}</td>
        <td>${student.grade.toFixed(2)}</td>
        <td>
            <button class="edit-btn" data-index="${index}">Modificar</button>
            <button class="delete-btn" data-index="${index}">Eliminar</button>
        </td>
    `;
    tablebody.appendChild(row);

    row.querySelector(".delete-btn").addEventListener("click", function () {
        deleteStudent(index);
    });

    row.querySelector(".edit-btn").addEventListener("click", function () {
        editStudent(index);
    });
}

function deleteStudent(index) {
    students.splice(index, 1);
    updateTable();
    calculateAverage();
    updateStats();
}

function editStudent(index) {
    const student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastname;
    document.getElementById("grade").value = student.grade;

    students.splice(index, 1);
    updateTable();
    calculateAverage();
    updateStats();
}

function updateTable() {
    tablebody.innerHTML = ""; 
    students.forEach((student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.lastname}</td>
            <td>${student.grade.toFixed(2)}</td>
            <td>
                <button class="edit-btn" data-index="${index}">Modificar</button>
                <button class="delete-btn" data-index="${index}">Eliminar</button>
            </td>
        `;
        tablebody.appendChild(row);

        row.querySelector(".delete-btn").addEventListener("click", function () {
            deleteStudent(index);
        });

        row.querySelector(".edit-btn").addEventListener("click", function () {
            editStudent(index);
        });
    });
    updateStats();
}

function calculateAverage() {
    if (students.length === 0) {
        document.getElementById("average").textContent = "N/A";
        return;
    }
    const total = students.reduce((sum, student) => sum + student.grade, 0);
    const average = (total / students.length).toFixed(2);
    document.getElementById("average").textContent = average;
}

function updateStats() {
    const total = students.length;
    if (total === 0) {
        document.getElementById("total-students").textContent = "0";
        document.getElementById("approved-students").textContent = "0%";
        document.getElementById("failed-students").textContent = "0%";
        return;
    }

    const approved = students.filter(s => s.grade >= 4.0).length;
    const failed = students.filter(s => s.grade < 4.0).length;

    const approvedPercentage = ((approved / total) * 100).toFixed(2);
    const failedPercentage = ((failed / total) * 100).toFixed(2);

    document.getElementById("total-students").textContent = total;
    document.getElementById("approved-students").textContent = `${approvedPercentage}%`;
    document.getElementById("failed-students").textContent = `${failedPercentage}%`;
}