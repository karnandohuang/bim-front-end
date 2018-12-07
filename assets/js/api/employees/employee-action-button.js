$(document).ready(function () {

    function setDeleteModalAttributes() {
        $('.modal-title').text("Delete Employee");
        $('#entry-edit-form').css('display', 'none');
        $('#table-modal-div').css('display', '');
        $('.modal-save-button').prop('id', 'delete-employee-button');
        $("#modal-table>tbody").empty();
        $('#employee-action-modal').modal('show');
    }

    function displayMessageBox(message) {
        $('#message-box .modal-body').text(message);
        $('#message-box').modal('show');
    }

    function deleteButtonOnClick() {
        $('.modal-footer').on('click', '#delete-employee-button', function () {
            let employees = [];

            $('.delete-row').each(function () {
                let deleteId = $(this).closest('tr').find('.delete-id').html();
                employees.push(deleteId);
            });

            let deleteEmployeeData = {"ids": employees};
            let deleteEmployeeJson = JSON.stringify(deleteEmployeeData);

            $.ajax({
                url: 'http://localhost:8080/bim/api/employees',
                type: 'DELETE',
                contentType: 'application/json',
                dataType: 'JSON',
                data: deleteEmployeeJson,
                success: function (response, status, jqXHR) {
                    if (response.success === true) {
                        displayMessageBox("Delete Success");
                        $('#employee-action-modal').modal('hide');
                        $('.modal-footer').on('click', '#message-box-button', function () {
                            window.location.reload();
                        });
                    } else {
                        displayMessageBox("Delete Failed " + "(" + response.errorMessage + ")");
                    }
                },
                error: function (response, status, jqXHR) {
                    displayMessageBox("Delete Failed" + "(" + status + ")");
                }
            });

            $('.modal-footer').off('click', '#delete-employee-button');
        })
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
                superiorId: selectedSuperiorId
            };
            selectedEmployee.push(employee);
        });

        if(!selectedEmployee.length>0){
            displayMessageBox("You must select at least 1 employee");
        }
        else{
            if(this.id == 'delete-button'){
                setDeleteModalAttributes();

                //print table
                for(let i=0;i<selectedEmployee.length;i++) {
                    let tr = "<tr class='delete-row'>";
                    let td1 = "<td class='delete-id'>" + selectedEmployee[i].id + "</td>";
                    let td2 = "<td class='delete-name'>" + selectedEmployee[i].name + "</td>";
                    let td3 = "<td class='delete-email'>" + selectedEmployee[i].email + "</td>";
                    let td4 = "<td class='delete-position'>" + selectedEmployee[i].position + "</td>";
                    let td5 = "<td class='delete-division'>" + selectedEmployee[i].division + "</td></tr>";

                    $("#modal-table").append(tr+td1+td2+td3+td4+td5);
                }

                deleteButtonOnClick();
            }
        }
    });
});