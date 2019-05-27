@workExperiences
Feature: WorkExperiences

  Describes scenarios of adding experiences

  Background:
    Given I open the add experiences page

  Scenario: Unauthenticated user can navigate to next page without experiences
    Given I am not logged in
    When I try to go to the next view
    Then I should be able to navigate to next view

  Scenario: Unauthenticated user can add an experience
    Given I am not logged in
    When I type the experience "title" as "Utvecklare"
    When I type the experience "schoolOrCompany" as "JobTech"
    When I type the experience "startDate-input" as "2018-01"
    When I type the experience "endDate-input" as "2018-05"
    When I add the experience
    Then I should see "Utvecklare" with "JobTech" within my experiences

  Scenario: Unauthenticated user can update an existing experience
    Given I am not logged in
    When I type the experience "title" as "Utvecklare"
    When I type the experience "schoolOrCompany" as "JobTech"
    When I type the experience "startDate-input" as "2018-01"
    When I type the experience "endDate-input" as "2018-05"
    When I add the experience
    When I start updating an experience
    When I clear the field "title"
    When I type the experience "title" as "Testare"
    When I save the updated experience
    Then I should see "Testare" with "JobTech" within my experiences

  Scenario: Unauthenticated user can delete an existing experience
    Given I am not logged in
    When I type the experience "title" as "Utvecklare"
    When I type the experience "schoolOrCompany" as "JobTech"
    When I type the experience "startDate-input" as "2018-01"
    When I type the experience "endDate-input" as "2018-05"
    When I add the experience
    When I start updating an experience
    When I delete an experience
    Then I should not see any experiences
