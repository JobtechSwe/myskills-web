@qrCode
Feature: Login 

    Describes scenarios of Logging in

    Background:
        Given I open the login page

    Scenario: Login-page shows an link to Egendata 
        Then I should see a link which can open the Egendata-application
