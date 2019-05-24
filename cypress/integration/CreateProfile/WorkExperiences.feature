@workExperiences
Feature: WorkExperiences

  Describes scenarios of adding experiences

  Background:
    Given I open the add experiences page

  Scenario: Unauthenticated user can navigate to next page without experiences
    Given I am not logged in
    When I try to go to the next view
    Then I should be able to navigate to next view
