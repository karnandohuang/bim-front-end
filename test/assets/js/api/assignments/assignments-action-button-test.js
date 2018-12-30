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

describe('Show Message Box', function () {
    var a;

    beforeEach(function (done) {
        require([path], function (assignmentActionButton) {
            // console.log("some ->" + some);
            // displayMessageBox("hello");



            done();
        });
    });

    // beforeEach(function() {
    //     sinon.stub(jQuery, 'ajax').yieldsTo('success', {
    //     });
    // });
    //
    // afterEach(function() {
    //     jQuery.ajax.restore();
    // });

    it('should show message box', function (done) {
        let assignment = {
            ids: ["AT001"],
            status: "Received"
        };
        // let assignmentJson = JSON.stringify(assignment);

        // assignmentActionButton.changeStatusAjax("Reject", assignmentJson);
        // expect($.ajax.calledOnce).to.be.true;
        done();
    });
});

//
// define(['assets/js/api/assignments/assignments-action-button'], function (assignmentActionButton) {
//     describe('expect to show message box', function () {
//         it('should show message box', function () {
//             // displayMessageBox("Hello");
//         })
//     })
// });

define(['assets/js/api/assignments/assignments-action-button', 'chai-jquery', 'jsdom'], function (assignmentActionButton, chai_jquery, jsdom) {
    chai.use(chai_jquery);

    describe('set approve modal attribute', function () {
        it('should set the right attribute', function () {

            document.body.innerHTML = '<div id="entry-edit-form"></div>';
            console.log("document " + document.body.innerHTML);
            setApproveModalAttributes();
            expect($('div')).to.have.prop('display', 'block');
            // expect($('div')).to.have.attr('display', 'block');
            // expect($('div')).to.exist;
        })
    });
});
