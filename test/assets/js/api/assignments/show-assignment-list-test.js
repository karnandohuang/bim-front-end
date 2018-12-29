var expect = chai.expect;

var assignmentList = {
    //data
    assignmentId : '',
    employeeId : '',
    employeeName: '',
    itemId: '',
    itemName: '',
    itemQty: '',
    assignmentStatus: '',
    assignmentNotes: '',

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
                console.log("obj: " + response);
            }
        });
    },

    callAjax : function(){
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
                self.employeeId= response.employeeId;
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
        beforeEach(function() {
            sinon.stub(jQuery, 'ajax').yieldsTo('success', {
                assignmentId: 'AT001',
                employeeId : 'EM001',
                employeeName: 'Karnando Sepryan',
                itemId: 'IM001',
                itemName: 'Dell XPS 13',
                itemQty: '2',
                assignmentStatus: 'Pending',
                assignmentNotes: ''
            });
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

            // assignmentList.callAjax(currentPage);
            showAssignmentListAjax(currentPage);
            expect(assignmentList.assignmentId).to.equals('AT001');
            expect(assignmentList.employeeId).to.equals("EM001");
            expect(assignmentList.employeeName).to.equals("Karnando Sepryan");
            expect(assignmentList.itemId).to.equals("IM001");
            expect(assignmentList.itemName).to.equals("Dell XPS 13");
            expect(assignmentList.itemQty).to.equals("2");
            expect(assignmentList.assignmentStatus).to.equals("Pending");
            expect(assignmentList.assignmentNotes).to.equals("");
            done();
        });
    });
});