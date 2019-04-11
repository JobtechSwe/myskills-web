@addExperience
Feature: AddExperience

  Describes scenarios of adding experiences

  Background:
    Given I open the add experience page

  Scenario: Unauthenticated user searches for work experiences and adds top item
    Given I am not logged in
    When I search for "Banarbetare"
    Then I should see a list with a list item that contains "Banarbetare"
    When I click the item containing the text "Banarbetare"
      And I reload the page
    Then The added experience should still be present

  Scenario: Authenticated user searches for work experiences and adds top item
    Given I am logged in
    When I search for "Banarbetare"
    Then I should see a list with a list item that contains "Banarbetare"
    When I click the item containing the text "Banarbetare"
      And I use a new browser
      And I login
    Then The added experience should still be present
