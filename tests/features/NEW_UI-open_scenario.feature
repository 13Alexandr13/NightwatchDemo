Feature: Open forecast scenario in WFM new_UI
I want to open existing forecast scenario in new_UI

@scenario_open
Scenario: Open forecast scenario in new WFM UI
	Given I logined in Genesys WFM and see old_UI
	Then I am clicking NEW_UI button 
	Then I want to view Forecast3 forecast Scenario
	Then As a result I should see Interaction volumes forecast for Inbound call
	
	
	
	
	


	