var expect = chai.expect;
var path = './assets/js/api/assignments/assignments-action-button';

var changeAssignmentStatus = {
    callAjax: function () {
        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/changeStatus',
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            // data: jsonData,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', "Bearer " + localStorage.getItem('token'));
            },
            success: function (response, status, jqXHR) {
            }
        });
    },
};

describe('Change Assignment Status', function(){
    beforeEach(function () {
        sinon.stub(jQuery, 'ajax').yieldsTo('success', {

        });
    });

    afterEach(function() {
        jQuery.ajax.restore();
    });

    it('should return true', function (done) {
        changeAssignmentStatus.callAjax();
        expect(jQuery.ajax.calledOnce).to.be.true;
        done();
    });
});

describe('Change Assignment Status With Authorization', function () {
    describe('Accept Assignment', function () {

        beforeEach(function () {
            sinon.stub(jQuery, 'ajax').yieldsTo('success', {});
        });

        afterEach(function () {
            jQuery.ajax.restore();
        });

        it('should return true', function (done) {
            changeAssignmentStatus.callAjax();
            expect(jQuery.ajax.calledOnce).to.be.true;
            done();
        });
    });
});

describe('blabla', function () {
    it('should ', function () {
        let jqdiv;

        beforeEach(() => {
            const div = document.createElement('div');
            div.setAttribute('id', 'message');
            document.body.appendChild(div);
            jqdiv = $(div);
        });


        it('should say hello', () => {
            expect(jqdiv.text()).to.contain('Hello, world!');
        });
    });
});


define(['assets/js/api/assignments/assignments-action-button'], function () {
    describe('getAssignmentIds() ', function () {
        let selectedAssignment = [];

        beforeEach(function () {
            let assignment1 = {
                employeeId: "EM068",
                employeeName: "Stelli Tansss",
                id: "AT039",
                itemName: "iPhone 888",
                itemSKU: "IM023",
                quantity: "1",
                status: "Approved"
            };
            let assignment2 = {
                employeeId: "EM068",
                employeeName: "Stelli Tansss",
                id: "AT040",
                itemName: "iPhone 888",
                itemSKU: "IM023",
                quantity: "2",
                status: "Approved"
            };
            selectedAssignment.push(assignment1);
            selectedAssignment.push(assignment2);
        });

        it('should return correct ids', function () {
            console.log("assignment : " + JSON.stringify(selectedAssignment));
            let ids = [];
            ids = getAssignmentIds(selectedAssignment, ids, "Approved");

            console.log("ids : " + JSON.stringify(ids));
            expect(ids).to.contain("AT039", "AT068");
        });
    });
});
