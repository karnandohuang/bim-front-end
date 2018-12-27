var expect = chai.expect;
var path = 'base/assets/js/api/assignments/assignments-action-button.js';

// define(['require', path], function (require) {
//     var assignmentActionButton = require(path);
// });

var assignmentActionButton = require(path);

require([path], function (assignmentActionButton) {
    console.log("some ->" + some);
});


// console.log(assignmentActionButton.something);

var changeAssignmentStatus = {
    callAjaxWithAuthorization: function () {
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
    callAjaxWithoutAuthorization: function () {
        $.ajax({
            url: 'http://localhost:8080/bim/api/requests/changeStatus',
            type: 'PUT',
            dataType: 'JSON',
            async: false,
            contentType: 'application/json',
            // data: jsonData,
            success: function (response, status, jqXHR) {
            }
        });
    }
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
        changeAssignmentStatus.callAjaxWithAuthorization();
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
            changeAssignmentStatus.callAjaxWithAuthorization();
            expect(jQuery.ajax.calledOnce).to.be.true;
            done();
        });

        // it('should return true if assignment is pending', function () {
        //
        // });
        //
        // it('should return true if assignment is accepted', function () {
        //
        // });
        //
        // it('should return false if assignment is rejected', function () {
        //
        // });
    });

    // describe('Reject Assignment', function () {
    //     beforeEach(function () {
    //         sinon.spy(jQuery, 'ajax');
    //     });
    //
    //     afterEach(function() {
    //         jQuery.ajax.restore();
    //     });
    //
    //     // it('reject assignment ajax call with authorization should return true', function () {
    //     //
    //     // });
    //     //
    //     // it('reject assignment ajax call without authorization should return true', function () {
    //     //
    //     // });
    //     //
    //     // it('reject assignment ajax call with authorization and assignment is pending should return true', function () {
    //     //
    //     // });
    //     //
    //     // it('reject assignment ajax call with authorization and assignment is accepted should return false', function () {
    //     //
    //     // });
    //     //
    //     // it('reject assignment ajax call with authorization and assignment is handover should return false', function () {
    //     //
    //     // });
    // });

    // describe('Handover Assignment', function (done) {
    //     beforeEach(function () {
    //         // sinon.spy(jQuery, 'ajax');
    //     });
    //
    //     afterEach(function() {
    //         // jQuery.ajax.restore();
    //     });
    //
    //     // it('handover assignment ajax call with authorization should return true', function () {
    //     //
    //     // });
    //     //
    //     // it('handover assignment ajax call without authorization should return true', function () {
    //     //
    //     // });
    //     //
    //     // it('handover assignment ajax call with authorization and assignment is pending should return true', function () {
    //     //
    //     // });
    //     //
    //     // it('handover assignment ajax call with authorization and assignment is accepted should return false', function () {
    //     //
    //     // });
    //     //
    //     // it('handover assignment ajax call with authorization and assignment is handover should return false', function () {
    //     //
    //     // });
    // });
});

describe('Change Assignment Status Without Authorization', function (done) {
    describe('Accept Assignment', function () {

        beforeEach(function() {
            sinon.stub(jQuery, 'ajax').yieldsTo('success', {
            });
        });

        afterEach(function() {
            jQuery.ajax.restore();
        });

        it('accept assignment ajax call without authorization should return true', function (done) {
            changeAssignmentStatus.callAjaxWithoutAuthorization();
            expect($.ajax.calledOnce).to.be.true;
            done();
        });
    });
});

describe('Show Message Box', function () {
    var a;

    // beforeEach(function (done) {
        // require([path], function (assignmentActionButton) {
        //     console.log("some ->" + some);
        //     displayMessageBox("hello");
        //     a = some;
        //     done();
        // });
    // });

    beforeEach(function() {
        sinon.stub(jQuery, 'ajax').yieldsTo('success', {
        });
    });

    afterEach(function() {
        jQuery.ajax.restore();
    });

    it('should show message box', function (done) {
        let assignment = {
            ids: ["AT001"],
            status: "Received"
        };
        let assignmentJson = JSON.stringify(assignment);

        assignmentActionButton.changeStatusAjax("Reject", assignmentJson);
        expect($.ajax.calledOnce).to.be.true;
        done();
    });
});

