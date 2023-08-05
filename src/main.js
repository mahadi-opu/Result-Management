const student_create_form = document.getElementById("student_create_form");
const student_edit_form = document.getElementById("student_edit_form");
const student_result_modal = document.getElementById("student_result_modal");

const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msg-edit");
const msgResult = document.querySelector(".msg-result");

const all_student_list = document.querySelector(".all-student-list");
const singleStudentview = document.querySelector(".view-single-student");




// Submit Student Create Form
student_create_form.onsubmit = e => {
  // DATA Load OFF
  e.preventDefault();

  // Form DATA Cash
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // Data Valiadtion & Alert Massage
  if (!data.name || !data.roll || !data.reg) {
    msg.innerHTML = createAlert(" All Fields Are Requierd ");
  } else if (!isNumber(data.roll)) {
    msg.innerHTML = createAlert(" Invalid Roll Number ");
  } else if (!isNumber(data.reg)) {
    msg.innerHTML = createAlert(" Invalid Reg Number ");
  } else {
    const oldStudentsData = getDataLS("students");

    // Check roll Number
    if (oldStudentsData.some(item => item.roll === data.roll)) {
      msg.innerHTML = createAlert(" Roll already Exists");
      return;
    }

    // Check roll Number
    if (oldStudentsData.some(item => item.reg === data.reg)) {
      msg.innerHTML = createAlert(" Reg already Exists");
      return;
    }

    oldStudentsData.push({
      ...data, // তিনটা ডট কেন নিয়েছি ?
      result: null,
      createdAt: Date.now(),
      id: generateRandomUniqueID(25)
    });
    sendDataLS("students", oldStudentsData);
    // DATA Reset
    e.target.reset();

    msg.innerHTML = createAlert(
      `<strong> ${data.name} </strong>  Create successfull `,
      "success"
    );

    getStudents();
  }
};

// Show All Students
const getStudents = () => {
  const students = getDataLS("students");

  let content = "";
  if (students.length > 0) {
    students.reverse().map((student, index) => {
      content += `
            <tr class="align-middle">
                <td>${index + 1}</td>
                <td><img
                    style="
                    width: 60px;
                    height: 60px;
                    object-fit: cover;
                    border-radius:50px;
                    border:5px solid white;
                    "
                    src="${student.photo}" 
                    alt="${student.name}"></td>
                <td>${student.name}</td>
                <td> ${student.roll} </td>
                <td> ${student.reg}</td>
                <td> ${timeAgo(student.createdAt)}</td>
                <td> 

                    ${ student.result === null 
                          ? '<button class="btn btn-sm btn-success" data-bs-toggle="modal" data-bs-target="#student_result_modal" onclick="addResult(' + student.id +')"> Add result </button>'
                          : '<button class="btn btn-sm btn-warning"> View Result </button>'
                    }

                </td>
                <td> 
                    <button class="btn btn-sm btn-info" data-bs-toggle="modal" 
                    data-bs-target="#view_single_student_modal" onclick="viewSingleStudent('${student.roll}')"> 
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" data-bs-toggle="modal" 
                    data-bs-target="#edit_single_student_modal" onclick="editStudent('${student.id}')"> 
                        <i class="fa fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStudent('${student.roll}')">  
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
  } else {
    content = `
            <tr>
                <td colspan="8" class="text-center"> No Data Found </td>
            </tr>
        `;
  }
  all_student_list.innerHTML = content;
};
getStudents();

// delete student
const deleteStudent = roll => {
  const confirmAlert = confirm("Are you sure");

  if (confirmAlert) {
    const oldStudent = getDataLS("students");
    const updatedData = oldStudent.filter(data => data.roll !== roll);
    sendDataLS("students", updatedData);
    getStudents();
  } else {
    alert("your data safe");
  }
};

// View student
const viewSingleStudent = roll => {
  const allStudent = getDataLS("students");
  const oneStudent = allStudent.find(student => student.roll === roll);
  singleStudentview.innerHTML = `
        <img 
            src="${oneStudent.photo}" 
            alt=""
            class="shadow mb-5 mx-auto"
            style="width: 50%; border-radius: 10px;"
        >
        <h6> Name: ${oneStudent.name} </h6>
        <P> Roll No:${oneStudent.roll} | Regg No: ${oneStudent.reg} </P>
`;
};

// Edit Student
const editStudent = id => {
  const oldStudent = getDataLS("students");
  const data = oldStudent.find(data => data.id === id);

  student_edit_form.querySelector('input[name="id"]').value = data.id;
  student_edit_form.querySelector('input[name="name"]').value = data.name;
  student_edit_form.querySelector('input[name="roll"]').value = data.roll;
  student_edit_form.querySelector('input[name="reg"]').value = data.reg;
  student_edit_form.querySelector('input[name="photo"]').value = data.photo;
  student_edit_form
    .querySelector("img#previewPhoto")
    .setAttribute("src", data.photo);
};

// Submit Student Edit Form
student_edit_form.onsubmit = e => {
  e.preventDefault();

  // Form DATA Cash
  const form_data = new FormData(e.target);
  const data = Object.fromEntries(form_data.entries());

  // Get Data with localStorage
  const oldStudentsData = getDataLS("students");
  oldStudentsData[oldStudentsData.findIndex(item => item.id === data.id)] = {
    ...oldStudentsData[oldStudentsData.findIndex(item => item.id === data.id)],
    ...data
  };

  sendDataLS("students", oldStudentsData);
  // Check roll Number
  if (oldStudentsData.some(item => item.roll === data.roll)) {
    msgEdit.innerHTML = createAlert(" Roll already Exists");
    return;
  }
  // Check reg Number
  if (oldStudentsData.some(item => item.reg === data.reg)) {
    msgEdit.innerHTML = createAlert(" Reg already Exists");
    return;
  }

  getStudents();
};

// Add Result
const addResult = (id) => {
    alert(id);
}

// Submit Student Add Result