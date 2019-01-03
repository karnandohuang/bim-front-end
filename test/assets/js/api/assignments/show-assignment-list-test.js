var expect = chai.expect;

var assignmentList = {
    //data
    success: 'true',
    code: '200 OK',
    value: {
        assignment: {
            id: "",
            qty: "",
            status: "",
            notes: "",
            createdDate: "",
            updatedDate: "",
            createdBy: "",
            updatedBy: "",
            employee: {
                id: "",
                name: "",
                superiorId: "",
                dob: "",
                email: "",
                password: "",
                position: "",
                division: "",
                createdDate: "",
                updatedDate: "",
                createdBy: "",
                updatedBy: "",
                role: ""
            },
            item: {
                id: "",
                name: "",
                price: "",
                location: "",
                createdDate: "",
                updatedDate: "",
                createdBy: "",
                updatedBy: "",
                qty: "",
                imageUrl: ""
            }
        }
    },

    callAjaxWithAuthorization: function () {
        jQuery.ajax({
            url: 'http://localhost:8080/bim/api/requests?pageNumber=1&pageSize=&sortedBy=id&sortedType=asc',
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            success: function (response, status, jqXHR) {
                console.log("obj: " + JSON.stringify(response));
            }
        });
    },

    callAjax: function () {
    },

    getData: function () {
        var self = this;
        jQuery.ajax({
            url: 'http://localhost:8080/bim/api/requests?pageNumber=1&pageSize=&sortedBy=id&sortedType=asc',
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            success: function (response, status, jqXHR) {
                console.log(response);

                self.assignmentId = response.assignmentId;
                self.employeeId = response.employeeId;
                self.employeeName = response.employeeName;
                self.itemId = response.itemId;
                self.itemName = response.itemName;
                self.itemQty = response.itemQty;
                self.assignmentStatus = response.assignmentStatus;
                self.assignmentNotes = response.assignmentNotes;
            }
        });
    }
};


describe('Assignment List Ajax Call', function () {

    beforeEach(function () {
        sinon.stub(jQuery, 'ajax').yieldsTo('success', {});
    });

    afterEach(function() {
        jQuery.ajax.restore();
    });

    it('Show Assignment List Ajax Request with authorization should return true', function (done) {
        assignmentList.callAjaxWithAuthorization();
        expect(jQuery.ajax.calledOnce).to.be.true;
        done();
    });

    // it('Show Assignment List Ajax Request without authorization should return false', function (done) {
    //     assignmentList.callAjaxWithoutAuthorization();
    //     // expect($.ajax.calledOnce).to.be.false;
    //     done();
    // });
});



define(['assets/js/api/assignments/show-assignment-list'], function () {
    describe('Get Assignment List', function () {
        let injectJson = {
            success : 'true',
            code: '200 OK',
            value: {
                assignment: {
                    id: 'AT065',
                    qty: 3,
                    status: "Approved",
                    notes: null,
                    createdDate: 1545152400000,
                    updatedDate: 1546016400000,
                    createdBy: "stellia@gdn-commerce.com",
                    updatedBy: "stellib@gdn-commerce.com",
                    employee: {
                        id: "EM093",
                        name: "Stelli Tan",
                        superiorId: "EM094",
                        dob: "01/01/2000",
                        email: "stellia@gdn-commerce.com",
                        password: null,
                        position: "IT Intern",
                        division: "IT",
                        createdDate: 1545152400000,
                        updatedDate: 1545670800000,
                        createdBy: "admin",
                        updatedBy: "admin1@gdn-commerce.com",
                        role: "SUPERIOR"
                    },
                    item: {
                        id: "IM020",
                        name: "Samsung J7ssss",
                        price: 1200000,
                        location: "Thamrin Office",
                        createdDate: 1542387600000,
                        updatedDate: 1546016400000,
                        createdBy: null,
                        updatedBy: "admin1@gdn-commerce.com",
                        qty: 8,
                        imageUrl: "/Users/karnandohuang/Documents/Projects/blibli-inventory-system/bim-back-end/resources2018/12/IM020/2001560093 - Karnando Sepryan.jpg"
                    }
                }
            }
        };

        beforeEach(function() {
            sinon.stub(jQuery, 'ajax').yieldsTo('success', injectJson);
        });

        afterEach(function() {
            jQuery.ajax.restore();
        });

        it('Get Assignment List Data from ajax request should return correct data', function (done) {
            let currentPage = 1;
            let pageSize = 6;
            let totalPage = 1;
            let sortedBy = "id";
            let sortedType = "asc";
            let filter="";

            // assignmentList.callAjaxWithAuthorization();
            // console.log(assignmentList);
            // showAssignmentListAjax(currentPage);
            // expect(assignmentList.success).to.equals('true');
            // console.log("value: " + JSON.stringify(assignmentList.value));
            // expect(assignmentList.value.assignment[0].id).to.equals('AT065');
            // expect(assignmentList.employeeId).to.equals("EM001");
            // expect(assignmentList.employeeName).to.equals("Karnando Sepryan");
            // expect(assignmentList.itemId).to.equals("IM001");
            // expect(assignmentList.itemName).to.equals("Dell XPS 13");
            // expect(assignmentList.itemQty).to.equals("2");
            // expect(assignmentList.assignmentStatus).to.equals("Pending");
            // expect(assignmentList.assignmentNotes).to.equals("");
            done();
        });
    });
});