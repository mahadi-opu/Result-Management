const search_result_form = document.getElementById("search_result_form");
const student_result_container = document.querySelector(".student_result_container");

search_result_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());

    console.log(data);

    let oldStudentsData = getDataLS("students");
    const studentResult = oldStudentsData.find(item => item.roll === data.roll && item.reg === data.reg);


    let content;
    if (studentResult) {
        content = `
        <div class="student-result">
            <div class="card-header">
            <h2> Student Result </h2>
            </div>
            <div class="card-body px-5 py-5">
            <div class="student-info text-center">
                <img src="${studentResult.photo}" style="width: 100px; border-radius: 50%;" alt="">
                <h3 class="my-3 "> ${studentResult.name}  </h3>
                <p> <b> Roll: </b> ${studentResult.roll} | <b> Registation No: </b> 4${studentResult.reg} </p>
                ${
                    getFinalResult({
                      bangla: studentResult.result.bangla,
                      english: studentResult.result.english,
                      math: studentResult.result.math,
                      arabic: studentResult.result.arabic,
                      social_science: studentResult.result.social_science,
                      religion: studentResult.result.religion,
                    }).result === "F"
                      ? '<h2 style="color:red;">Failed</h2>'
                      : '<h2 style="color:green;">Passed</h2>'
                  }
              
            </div>
            <table class="table table-bordered">
                <tr>
                    <th> Subject </th>
                    <th> Marks </th>
                    <th> GPA </th>
                    <th> Grade </th>
                    <th> CGPA </th>
                    <th> Final Result </th>
                </tr>
                <tr>
                    <td> Bangla </td>
                    <td> ${studentResult.result.bangla} </td>
                    <td> ${getGpaGrade(studentResult.result.bangla).gpa} </td>
                    <td> ${getGpaGrade(studentResult.result.bangla).grade} </td>
                    <td rowspan="6" align="center" class="col align-self-center"> 
                         ${getFinalResult({
                            bangla: studentResult.result.bangla,
                            english: studentResult.result.english,
                            math: studentResult.result.math,
                            arabic: studentResult.result.arabic,
                            social_science: studentResult.result.social_science,
                            religion: studentResult.result.religion,
                         }).cgpa.toFixed(2)}
                    </td>
                    <td rowspan="6" align="center" item="center">
                    ${
                        getFinalResult({
                          bangla: studentResult.result.bangla,
                          english: studentResult.result.english,
                          math: studentResult.result.math,
                          arabic: studentResult.result.arabic,
                          social_science: studentResult.result.social_science,
                          religion: studentResult.result.religion,
                        }).result
                      }
                    </td>
                </tr>
                <tr>
                    <td> English </td>
                    <td> ${studentResult.result.english} </td>
                    <td> ${getGpaGrade(studentResult.result.english).gpa} </td>
                    <td> ${getGpaGrade(studentResult.result.english).grade} </td>
                </tr>
                <tr>
                    <td> Math </td>
                    <td> ${studentResult.result.math}  </td>
                    <td> ${getGpaGrade(studentResult.result.math).gpa} </td>
                    <td> ${getGpaGrade(studentResult.result.math).grade} </td>
                </tr>
                <tr>
                    <td> Arabic </td>
                    <td> ${studentResult.result.arabic}  </td>
                    <td> ${getGpaGrade(studentResult.result.arabic).gpa} </td>
                    <td> ${getGpaGrade(studentResult.result.arabic).grade} </td>
                </tr>
                <tr>
                    <td> Social Science  </td>
                    <td> ${studentResult.result.social_science} </td>
                    <td> ${getGpaGrade(studentResult.result.social_science).gpa} </td>
                    <td> ${getGpaGrade(studentResult.result.social_science).grade} </td>
                </tr>
                <tr>
                    <td> Religion </td>
                    <td> ${studentResult.result.religion} </td>
                    <td> ${getGpaGrade(studentResult.result.religion).gpa} </td>
                    <td> ${getGpaGrade(studentResult.result.religion).grade} </td>
                </tr>
            </table>
            </div>
        </div>
        
        `
    }else {
       content = `<strong 
            style="color:red; 
            text-align:center; 
            font-size:30px; 
            padding:10px;"
            > Result not found  </strong>`; 
    }

    student_result_container.innerHTML = content;

    e.target.reset();
};

