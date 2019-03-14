const {Given, When, Then} =require('cucumber');
const {client} =require('nightwatch-api');

Given(/^I am opening google search page$/,{timeout:10000},  async function(){
	return await client
		.url('https://www.google.ru/?hl=ru')
		.pause(1000);		
	});
	
When(/^I am typing "(.+)" in search field$/,{timeout:10000},  async function(search){
			
		let serachBtnXpath="//*[contains(@id,'searchf')]/descendant::*[contains(@value, 'Google') and @name='btnK' and self::*/ancestor::div[@class='FPdoLc VlcLAe']]";
		let serachFieldXpath=".//*[contains(@id,'searchf')]/descendant::*[contains(@name,'q') and self::*/ancestor::div[contains(@class,'SDkEP')]]";		
		let googleLogoXpath='//*[@id="hplogo"]';
		
	 await client
		.useXpath()
		.assert.visible(serachFieldXpath)
 		.setValue(serachFieldXpath, search)
		.pause(1000)
		
		
		return client
		.waitForElementVisible(googleLogoXpath, 1000)
		.pause(1000)
		.click(googleLogoXpath)
 		.waitForElementPresent(serachBtnXpath, 1000)
		.waitForElementVisible(serachBtnXpath, 1000)
		.pause(1000)
 		.click(serachBtnXpath)
		
	});
	
	Then(/^I shold get nasa officual site as first result$/,{timeout:10000},  async function(){
		let parentElemXpath="//*[@id='search']/descendant::*[child::*/child::a[@href='https://www.nasa.gov/']]";
		//let elem=`${parentElemXpath}/descendant::span[@class='st']`;
		
		let xpath="//*[@id='search']/descendant::*[child::*/child::a[@href='https://www.nasa.gov/']]/descendant::span[@class='st']"
		return client
		.useXpath()
		//.expect.element(xpath).to.be.present
		.expect.element(xpath).text.contain(".gov brings you the latest news, images and videos from America's space agency")
	});