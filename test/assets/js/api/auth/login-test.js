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

    describe('set local storage', function () {
       it('should set token, role, and ts in local storage', function () {
           const date = Math.floor(Date.now() / 1000);
           const now = date + (60 * 60 * 2) + "";

           const response = {
             value : {
                 token : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjFAZ2RuLWNvbW1lcmNlLmNvbSIsImV4cCI6MTU0NjIzODAyNCwiaXNzIjoiY29tLmludmVudG9yeS5iaW0ifQ.y6XYRk80JEaEeZxaDiL0YsOgj1eCSEsCwFFd8XJ_QqtSBN4nAG6cP1fsi8yh1NqWSqEMgwLqPG5lCpGy3CXKmg",
                 role : "ADMIN",
                 ts : "1546238020"
             }
           };
            setLocalStorage(response);

           expect(window.localStorage.getItem("token")).to.equal("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjFAZ2RuLWNvbW1lcmNlLmNvbSIsImV4cCI6MTU0NjIzODAyNCwiaXNzIjoiY29tLmludmVudG9yeS5iaW0ifQ.y6XYRk80JEaEeZxaDiL0YsOgj1eCSEsCwFFd8XJ_QqtSBN4nAG6cP1fsi8yh1NqWSqEMgwLqPG5lCpGy3CXKmg");
           expect(window.localStorage.getItem("ts")).to.equal(now);
           expect(window.localStorage.getItem("role")).to.equal("ADMIN");
       });
    });
});