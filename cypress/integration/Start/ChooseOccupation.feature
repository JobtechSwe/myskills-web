@chooseOccupation
Feature: ChooseOccupation

  Describes scenarios of choosing occupation

  Background:
    Given I open the add occupation page

  Scenario: Unauthenticated user searches for work occupations and adds top item
    Given I am not logged in
    When I search for "Banarbetare"
    Then I should see a list with a list item that contains "Banarbetare"
    When I click the item containing the text "Banarbetare"
      And I reload the page
    Then The added occupation should still be present

  Scenario: Authenticated user searches for work occupations and adds top item
    Given I am logged in
    When I search for "Banarbetare"
    Then I should see a list with a list item that contains "Banarbetare"
    When I click the item containing the text "Banarbetare"
    # These does not work with the current implementation of the mydata-rest-app,
    #  And I use a new browser
    #  And I login
    #Then The added occupation should still be present
