casper.test.begin('Test redirect and back to URLs.', 5, function suite(test) {

  var url = 'https://www.crowdbotics.com/';

    casper.start(url, function() { // Check HTTP status code is 200.
            test.assertHttpStatus(200);
        })
        .then(function() { // Check page content.
            test.assertTitle('Crowdbotics: Software Engineering for Everyone.');
            test.assertUrlMatch(/^https:\/\/www.crowdbotics.com\//, 'We are at Crowdbotics home page.');
        }).then(function() { // Test click /personal and go to Twitter page. Then, back to home page.
            this.click('a.twitter'); // #1 Trigger click on a.twitter.
            this.wait(2000, function() { // #2 Wait for 2 seconds and check we are at Twitter page.
                test.assertUrlMatch(/^https:\/\/twitter.com\/crowdbotics/, 'We are at Crowdbotics - Twitter account.');
            });
            this.wait(100, function() { // #3 This is important. Use this.wait for synchronized testing or this will be fired after #1 and before #2.
                casper.back();
            });
            this.wait(2000, function() { // #4 Wait for 2 seconds and check we are at Crowdbotics home page.
                test.assertUrlMatch(/^https:\/\/www.crowdbotics.com\//, 'We are at Crowdbotics home page.');
            });
        }).run(function() {
            test.done();
        });
});

// To run this in command line: casperjs test testing/redirecting.js
