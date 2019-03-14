const {Given, When, Then} =require('cucumber');
const {client} =require('nightwatch-api');

let WFMwebAdress='http://localhost:8090/wfm';
let homeButtonXpath='//*[contains(@class,"gwt-MenuItem") and child::i[contains(@class,"icon-home")]]';
let newUIbuttonXpath='//*[contains(@class,"gwt-Button") and @title="New UI"]';

Given('I logined in Genesys WFM and see old_UI',{timeout:10000}, async function(){
	
	let welcomeLabel='//h2[@id="gwt-debug-welcomeLabel" and text()="Workforce Management"]';
	let UserNameXpath='//*[@class="ark-login"]//descendant::input[contains(@id,"usernameField") and parent::div[contains(@class,"ark-login-fields")]]';
	let UserPasswordXpath='//*[@class="ark-login"]//descendant::input[contains(@id,"passwordField") and parent::div[contains(@class,"ark-login-fields")]] ';
	let submitBtnXpath='//*[@class="ark-login"]//descendant::button[contains(@id,"loginButton") and ancestor::div[contains(@class,"ark-login")] ]';
	let footer1Xpath='//label[@class="GMHNNDUDMJB" and text()="Workforce Management"]';
	let footer2Xpath='//label[@class="GMHNNDUDLJB" and contains(text(),"All rights reserved.")]';
	
	return  client
		.useXpath()
		.url(WFMwebAdress)
		.assert.urlEquals('http://localhost:8090/wfm/login') //by default does not wait for url to change. Time limit to wait should be set explicitly in test Env config. 
		
		//awaiting login page to show up
		.waitForElementVisible(welcomeLabel,5000,20)
		.waitForElementVisible(UserNameXpath,5000,20)
		.waitForElementVisible(UserPasswordXpath,5000,20)
		
		//entering password, login and clicking LogIn button
		.setValue(UserNameXpath,'default')
		.setValue(UserPasswordXpath,'password')
		.pause(1000)
		.click(submitBtnXpath)
		
		//cheking if old UI  Supervisor main page is opened
		.assert.urlEquals('http://localhost:8090/wfm/Supervisor')
		.waitForElementVisible(homeButtonXpath,5000,20)
		.waitForElementVisible(newUIbuttonXpath,5000,20)
		.waitForElementVisible(footer1Xpath,5000,20)
		.waitForElementVisible(footer2Xpath,5000,20)
		.pause(2000);		
});

Then('I am clicking NEW_UI button',{timeout:100000}, async function(){
	let mainBarXpath='//div[child::*/child::*[@class="genesys-nav-icon"] and child::*/child::*[@class="wfm-nav-title"]]';
	let wfmNavTitleXpath=mainBarXpath+'/descendant::b[parent::section[@class="wfm-nav-title"]]';
	
	await client.useXpath()
	await client.waitForElementVisible(newUIbuttonXpath,5000,20)
	await client.click(newUIbuttonXpath)
	await client.assert.urlEquals(WFMwebAdress+'/NewSupervisor/forecast/scenarios')
	await client.waitForElementVisible(mainBarXpath,5000,20)
	await client.expect.element(wfmNavTitleXpath).text.to.equal('Workforce Management')
	await client.pause(2000);
	
});

Then(/^I want to view (.+) forecast Scenario$/, {timeout:100000}, async function(scenarioName){
	/*let secondViewXpath='//div[@id="secondView"]';
	let scenarioTableXpath='//div[@id="secondView"]/descendant::div[contains(@class,"body-container") and ancestor::div[@class="ag-body"]]';
	let scenarioRowXpath=`/child::div[child::div[@col-id="name" and child::span[text()="${scenarioName}"]]]`;
	let checkBoxXpath=secondViewXpath+'/descendant::span[@class="ag-selection-checkbox"]';
	let openBtnXpath=secondViewXpath+'//div[@id="secondView"]/descendant::button[@class="sc-htoDjs hUBaBm"]';
	return await client
	.useXpath()
	//check if MyScenario Tab Opened
	
	//check scenario checkbox	
	.waitForElementVisible(checkBoxXpath,5000,20)
	.click(checkBoxXpath)
	
	//click open button to open scenario
	.click(openBtnXpath) // if button is not clickable will return error
	
	//check if scenario opened
	.waitForElementVisible(secondViewXpath+'/descendant::div[child::h2]/child::h2',5000,20)
	.expect(secondViewXpath+'/descendant::div[child::h2]/child::h2').text.to.equal('Select an activity within the nested tree to load volumes')
	*/
});

Then('As a result I should see Interaction volumes forecast for Inbound call', {timeout:100000}, async function(){
	
});

