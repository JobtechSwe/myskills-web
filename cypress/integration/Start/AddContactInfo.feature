@addContactInfo
Feature: AddContactInfo

  User can add contact information

  Background:
    Given I open the kontakt-page

  Scenario: User can add contact information
    When I type "Gordon Freeman" as "name"
    And I type "gordon@example.com" as "email"
    When I press Fortsätt
    And I reload the page
    And I go back to "/skapa-cv/kontakt"
    Then My "name" should still be set as "Gordon Freeman"
    And My "email" should still be set as "gordon@example.com"

# TODO: Implement the skipped statements when we implement better form validation that is visable in the DOM
