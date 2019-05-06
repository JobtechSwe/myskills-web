@addContactInfo
Feature: AddContactInfo

  User can add contact information

  Background:
    Given I open the kontakt-page

  Scenario: User can add contact information
    When I type "Gordon Freeman" as "name"
    And I type "gordon@example.com" as "email"
    When I press Spara
    And I reload the page
    Then My "name" should still be set as "Gordon Freeman"
    And My "email" should still be set as "gordon@example.com"

  Scenario: User can not save information if "name" is missing
    When I type "gordon@example.com" as "email"
    When I press Spara
    And I reload the page
    Then My information has not be saved
  # Then I should see an error that I also need to fill out "name"

  Scenario: User can not save information if "email" is missing
    When I type "Gordon Freeman" as "name"
    When I press Spara
    And I reload the page
    Then My information has not be saved
# Then I should see an error that I also need to fill out "email"

# TODO: Implement the skipped statements when we implement better form validation that is visable in the DOM
