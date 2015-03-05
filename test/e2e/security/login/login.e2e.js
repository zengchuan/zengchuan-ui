describe('zengchuan login', function() {
    beforeEach(function() {
        browser.get('http://localhost:9090');
    });

  //it('should get commLanguageList', function() {
  //    languageList = element.all(by.repeater('commLanguage in commLanguageList'));
  //    expect(languageList.count()).toEqual(2);
  //});

    //it('should login', function() {
    //    var userCode = element(by.model('loginVO.userCode'));
    //    var password = element(by.model('loginVO.password'));
    //    var loginButton = element(by.id('loginButton'));
    //    userCode.sendKeys(1);
    //    password.sendKeys(1);
    //
    //    loginButton.click().then(function () {
    //        browser.getCurrentUrl().then(function(url) {
    //            expect(url.indexOf('http://localhost:8090/zc/html/security/main/index.html') > -1).toBe(true);
    //        });
    //    });
    //
    //
    //});

    it('should create simple account', function() {
        var createSimpleAccountButton = element(by.id('createSimpleAccountButton'));

        createSimpleAccountButton.click().then(function () {
            browser.getCurrentUrl().then(function(url) {
                expect(url.indexOf('http://localhost:9090/security/create-simple-account') > -1).toBe(true);
            });
        });


    });


});
