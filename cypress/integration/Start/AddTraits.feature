@addTraits
Feature: AddTraits

  User can add traits 

  Background:
    Given I open the egenskaper-page

  Scenario: User can add a trait
    When I click Lägg till en ny egenskap
    When I type "Accepterande" as a "trait"
    When I press OK 
    Then "Accepterande" should be added as a trait 
