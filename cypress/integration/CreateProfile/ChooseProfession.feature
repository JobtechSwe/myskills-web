@chooseProfession
Feature: ChooseProfession

  Describes scenarios of choosing profession

  Background:
    Given I open the add profession page

  Scenario: Unauthenticated user cant navigate to next page without profession
    Given I am not logged in
    When I try to go to the next view
    Then I should remain on the same view

  Scenario: Unauthenticated user searches for work profession and adds top item
    Given I am not logged in
    When I search for "Banarbetare"
    Then I should see a list with a list item that contains "Banarbetare"
    When I click the item containing the text "Banarbetare"
      And I reload the page
    Then The added profession should still be present

  Scenario: Unauthenticated user can remove chosen profession
    Given I am not logged in
    When I search for "Banarbetare"
    Then I should see a list with a list item that contains "Banarbetare"
    When I click the item containing the text "Banarbetare"
    When I remove the chosen profession
      And I reload the page
    Then The added profession should not be present

  Scenario: Unauthenticated user can go navigate to next view when profession os chosen
    Given I am not logged in
    When I search for "Banarbetare"
    When I click the item containing the text "Banarbetare"
    When I try to go to the next view
    Then I should be able to navigate to next view
