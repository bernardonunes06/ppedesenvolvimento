document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const studentList = document.getElementById('student-list');
    const search = document.getElementById('search');

    form.addEventListener('submit', handleSubmit);
    search.addEventListener('input', handleSearch);

    loadStudents();

    function handleSubmit(event) {
        event.preventDefault();
        
        const id = document.getElementById('student-id').value;
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const matriculation = document.getElementById('matriculation').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;

        const student = {
            id: id || new Date().getTime().toString(),
            name,
            dob,
            matriculation,
            email,
            phone,
            address
        };

        let students = getStudents();
        if (id) {
            students = students.map(s => s.id === id ? student : s);
        } else {
            students.push(student);
        }
        
        localStorage.setItem('students', JSON.stringify(students));
        form.reset();
        document.getElementById('student-id').value = '';
        loadStudents();
    }

    function handleSearch() {
        const query = search.value.toLowerCase();
        const students = getStudents();
        const filteredStudents = students.filter(student => 
            student.name.toLowerCase().includes(query) ||
            student.matriculation.toLowerCase().includes(query)
        );
        renderStudents(filteredStudents);
    }

    function loadStudents() {
        const students = getStudents();
        renderStudents(students);
    }

    function getStudents() {
        const students = localStorage.getItem('students');
        return students ? JSON.parse(students) : [];
    }

    function renderStudents(students) {
        studentList.innerHTML = '';
        students.forEach(student => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${student.name}</strong> - Matrícula: ${student.matriculation}
                </div>
                <div>
                    <button onclick="editStudent('${student.id}')">Editar</button>
                    <button onclick="deleteStudent('${student.id}')">Excluir</button>
                </div>
            `;
            studentList.appendChild(li);
        });
    }

    window.editStudent = function(id) {
        const students = getStudents();
        const student = students.find(s => s.id === id);
        
        document.getElementById('student-id').value = student.id;
        document.getElementById('name').value = student.name;
        document.getElementById('dob').value = student.dob;
        document.getElementById('matriculation').value = student.matriculation;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('address').value = student.address;
    };

    window.deleteStudent = function(id) {
        if (confirm('Tem certeza que deseja excluir este aluno?')) {
            let students = getStudents();
            students = students.filter(student => student.id !== id);
            localStorage.setItem('students', JSON.stringify(students));
            loadStudents();
        }
    };
});
