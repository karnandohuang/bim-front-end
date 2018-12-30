var expect = chai.expect;

define(['assets/js/api/auth/check-logged-in'], function () {
    describe('check logged in', function () {
        beforeEach(function () {
            var stub = sinon.stub(window.location.replace("login.html"));
        });
        it('should check token in local storage', function () {
            isLoggedIn();

            expect(stub.calledOnce).to.be.true;
        });
    });
});