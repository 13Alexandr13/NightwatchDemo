const chromedriver = require('chromedriver');
const geckodriver = require('geckodriver');

module.exports = {
  test_settings: {  
    default: {
      webdriver: {
		start_process: true,
        port: 4444,
        server_path: chromedriver.path,
        cli_args: ['--port=4444']
      },
	  
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['disable-gpu']
        }		
      },
	  
	  globals:{
		  //waitForConditionTimeout: 5000, // 
		  retryAssertionTimeout: 2000 //timeout during which attempts to check assertion is made
	  }
    }
    
  }
};
