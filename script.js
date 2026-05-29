// --- MOCK DATA ---
let students = [
    { id: 1, name: "John Doe", age: 10, class: "Class 1" },
    { id: 2, name: "Jane Smith", age: 11, class: "Class 2" },
    { id: 3, name: "Sam Wilson", age: 10, class: "Class 1" }
];

// --- LOGIN LOGIC ---
function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    // Simple hardcoded check
    if (user === 'admin' && pass === 'admin') {
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
        loadDashboard();
    } else {
        errorMsg.textContent = "Invalid Username or Password";
    }
}

function logout() {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('error-msg').textContent = '';
}

// --- NAVIGATION LOGIC ---
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(sec => sec.style.display = 'none');

    // Show selected section
    document.getElementById(sectionId).style.display = 'block';

    // Update Title
    const titles = {
        'dashboard': 'Dashboard',
        'students': 'Student Management',
        'teachers': 'Teacher Management',
        'fees': 'Fee Management'
    };
    document.getElementById('page-title').innerText = titles[sectionId];

    // Update Sidebar Active State
    const navItems = document.querySelectorAll('.sidebar nav ul li');
    navItems.forEach(item => item.classList.remove('active'));
    // Note: In a real app, you'd match the clicked element better, 
    // but for this demo, we just remove active class from all.
    
    if(sectionId === 'dashboard') loadDashboard();
    if(sectionId === 'students') renderStudentTable();
}

// --- DASHBOARD LOGIC ---
function loadDashboard() {
    document.getElementById('total-students').innerText = students.length;
}

// --- STUDENT MANAGEMENT LOGIC ---

// Toggle Form Visibility
function toggleStudentForm() {
    const formContainer = document.getElementById('student-form-container');
    if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
}

// Render Table
function renderStudentTable() {
    const tbody = document.getElementById('student-table-body');
    tbody.innerHTML = ''; // Clear existing rows

    students.forEach((student, index) => {
        const row = `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.class}</td>
                <td>
                    <button class="delete-btn" onclick="deleteStudent(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

// Add Student
function addStudent(event) {
    event.preventDefault(); // Prevent form refresh

    const name = document.getElementById('s-name').value;
    const age = document.getElementById('s-age').value;
    const sClass = document.getElementById('s-class').value;

    const newStudent = {
        id: students.length + 1,
        name: name,
        age: age,
        class: sClass
    };

    students.push(newStudent);
    
    // Reset Form
    document.getElementById('add-student-form').reset();
    toggleStudentForm();
    
    // Refresh Table
    renderStudentTable();
    alert("Student Added Successfully!");
}

// Delete Student
function deleteStudent(index) {
    if(confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        renderStudentTable();
    }
}
