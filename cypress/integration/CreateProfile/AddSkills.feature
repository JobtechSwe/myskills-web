@addSkills
Feature: AddSkills

  User can add skills

  Background:
    Given I open the kompetenser-page
    And I have an occupation of "Systemutvecklare" set

  Scenario: User can add a skill 
    When I click Lägg till kompetens 
    And I type "ReasonML" as a skill 
    When I press OK
    Then "ReasonML" should be added as a skill 
