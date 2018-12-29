var expect = chai.expect;

define(['assets/js/api/auth/login'], function () {
    describe('login', function () {
        it('should return correct json data', function () {
            login('admin1@gdn-commerce.com', 'admin1');


            expectedData = {
                email: 'admin1@gdn-commerce.com',
                password : 'admin1'
            };

            expect(loginData).to.eql(expectedData);
        });
    });
});