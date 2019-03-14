Feature: Search something in google
I want to find nasa page in google search

@simple_google_search
Scenario: Searching nasa page in google
	Given I am opening google search page
	When I am typing "NASA" in search field
	Then I shold get nasa officual site as first result
	
	
	
	


	