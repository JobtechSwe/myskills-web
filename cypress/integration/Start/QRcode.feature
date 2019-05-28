@qrCode
Feature: QRCode

    Describes scenarios of Logging in with a QR-code

    Background:
        Given I open the login page

    Scenario: User can't login with invalid credentials
        Then I should see a link which can open the Egendata-application
