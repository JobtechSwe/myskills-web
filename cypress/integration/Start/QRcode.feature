@qrCode
Feature: QRCode

    Describes scenarios of Logging in with a QR-code

    Background:
        Given I open the startpage

    Scenario: User can't login with invalid credentials
        When I click login button
        Then I should see a qr-code

