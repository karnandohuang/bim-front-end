
var expect = chai.expect;

define(['assets/js/api/auth/logout'], function () {
    describe('logout', function () {
        it('should delete local storage data', function () {
            localStorage.setItem("token", "abcde");
            console.log(window.localStorage.getItem("token"));

            logout();

            console.log(window.localStorage.getItem("token"));
            expect(window.localStorage.getItem("token")).to.be.null;
        });
    });
});

