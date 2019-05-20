@addEducations
Feature: AddEducations

  Describes scenarios of adding educations 

  Background:
    Given I open the add education page

  Scenario: Unauthenticated adds an education 
    Given I am not logged in
    When I click on the placeholder for "Namn på skola..." and I enter "Stockholms Universitet" 
    When I click on the placeholder for "Namn på utbildning..." and I enter "Mytologi"
    When I click on the date-selector for "startDate" and enter "2018-08"
    When I click on the date-selector for "endDate" and enter "2019-01"
    And I click Lägg till
    Then I should see "Stockholms Universitet" with "Mytologi" within my educations
    
