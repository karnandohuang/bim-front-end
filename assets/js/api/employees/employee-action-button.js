$(document).ready(function () {
    let employeeJson;

    function setEditModalAttributes() {
        $('.modal-title').text("Edit Employee");
        $('#entry-edit-form').css('display', '');
        $("#table-modal-div").css("display", 'none');
        $('#employee-id-row').css('display', '');
        $('#employee-password-row').css('display', 'none');
        $('.modal-save-button').prop('id', 'edit-employee-button');
        $('#employee-action-modal').modal('show');
    }

    function setDeleteModalAttributes() {
        $('.modal-title').text("Delete Employee");
        $('#entry-edit-form').css('display', 'none');
        $('#table-modal-div').css('display', '');
        $('.modal-save-button').prop('id', 'delete-employee-button');
        $("#modal-table>tbody").empty();
        $('#employee-action-modal').modal('show');
    }

    $('#edit-button, #delete-button').click(function () {
        let selectedEmployee = [];
        $('.row-select input:checked').each(function () {
            let selectedId = $(this).closest('tr').find('.id').html();
            let selectedName = $(this).closest('tr').find('.name').html();
            let selectedEmail = $(this).closest('tr').find('.email').html();
            let selectedPosition = $(this).closest('tr').find('.position').html();
            let selectedDivision = $(this).closest('tr').find('.division').html();
            let selectedSuperiorId = $(this).closest('tr').find('.superiorId').html();


            let employee = {
                id: selectedId,
                name: selectedName,
                email: selectedEmail,
                position: selectedPosition,
                division: selectedDivision,
                superiorid: selectedSuperiorId
            };
            selectedEmployee.push(employee);

            employeeJson = JSON.stringify(selectedEmployee);
        });

        if(!selectedEmployee.length>0){
            $('#message-box .modal-body').text("You must select at least 1 employee");
            $('#message-box').modal('show');
        }
        else{
            if(this.id == 'edit-button'){
                if(selectedEmployee.length > 1){
                    $('#message-box .modal-body').text("You can only select 1 employee to edit");
                    $('#message-box').modal('show');
                } else {
                    let employee = JSON.parse(employeeJson);
                    $('#input-employee-id').val(employee[0].id);
                    $('#input-employee-name').val(employee[0].name);
                    $('#input-superior-id').val(employee[0].superiorid);
                    $('#input-email').val(employee[0].email);
                    $('#input-position').val(employee[0].position);
                    $('#input-division').val(employee[0].division);


                    setEditModalAttributes();

                    $('.modal-footer').on('click', '#edit-employee-button', function () {
                        let id = $('#input-employee-id').val();
                        let name = $('#input-employee-name').val();
                        let superiorId = $('#input-superior-id').val();
                        let dob = $('#datepicker').val();
                        let email = $('#input-email').val();
                        let position = $('#input-position').val();
                        let division = $('#input-division').val();

                        // TODO : add edit AJAX send API

                        var employee = {
                            id: id,
                            name: name,
                            superiorId: superiorId,
                            //the API PUT does not accept json without password field
                            password: "",
                            dob: dob,
                            email: email,
                            position: position,
                            division: division
                        };

                        console.log(employee);


                        var employeeJson = JSON.stringify(employee);
                        console.log(employeeJson);
                        $.ajax({
                            url: "http://localhost:8080/bim/api/employees",
                            type: "PUT",
                            dataType: "JSON",
                            contentType: "application/json",
                            data: employeeJson,
                            success: function () {
                                alert("Success");
                                window.location.reload();
                            },
                            error: function () {
                                alert("failed");
                            }
                        });
                    });
                }

            } else if(this.id == 'delete-button'){
                setDeleteModalAttributes();

                let employee = JSON.parse(employeeJson);


                for(let i=0;i<employee.length;i++) {
                    let tr = "<tr class='delete-row'>";
                    let td1 = "<td class='delete-id'>" + employee[i].id + "</td>";
                    let td2 = "<td class='delete-name'>" + employee[i].name + "</td>";
                    let td3 = "<td class='delete-email'>" + employee[i].email + "</td>";
                    let td4 = "<td class='delete-position'>" + employee[i].position + "</td>";
                    let td5 = "<td class='delete-division'>" + employee[i].division + "</td></tr>";

                    $("#modal-table").append(tr+td1+td2+td3+td4+td5);
                }

                let deleteEmployeeJson = {"ids": ""};
                let employees = [];

                $('.modal-footer').on('click', '#delete-employee-button', function () {
                    $('.delete-row').each(function () {
                        let deleteId = $(this).closest('tr').find('.delete-id').html();

                        employees.push(deleteId);
                    });

                    deleteEmployeeJson.ids = employees;
                    deleteEmployeeJson = JSON.stringify(deleteEmployeeJson);

                    $.ajax({
                        url: 'http://localhost:8080/bim/api/employees',
                        type: 'DELETE',
                        contentType: 'application/json',
                        dataType: 'JSON',
                        data: deleteEmployeeJson,
                        success: function () {
                            alert("delete success")
                            window.location.reload();
                        },
                        error: function () {
                            alert("delete unsuccessful")
                        }
                    });
                })
            }
        }
    });
});