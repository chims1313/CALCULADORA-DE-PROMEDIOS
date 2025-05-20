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

    this.reset();
});

const tablebody = document.querySelector("#studenttable tbody");

function addStudentToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastname}</td>
        <td>${student.grade.toFixed(2)}</td>
    `;
    tablebody.appendChild(row);
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