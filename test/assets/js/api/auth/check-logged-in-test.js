var expect = chai.expect;

define(['assets/js/api/auth/check-logged-in'], function () {
    describe('check logged in', function () {

        it('should redirect to login page if no token in local storage', function () {
            localStorage.setItem("token", "");
            let stub = sinon.stub(loc, "redirect").returns('login.html');

            isLoggedIn();

            expect(stub.calledOnce).to.be.true;
        });
    });
});