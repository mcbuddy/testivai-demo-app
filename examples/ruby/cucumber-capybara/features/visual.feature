Feature: Visual Regression Testing

  Background:
    Given I visit the homepage

  Scenario: Homepage visual test
    Then the "homepage" looks correct

  Scenario: Navigation bar visual test
    Then the "navbar" looks correct

  Scenario: Product cards visual test
    Then the "product-cards" looks correct

  Scenario: Checkout form visual test
    Given I visit the checkout page
    Then the "checkout-form" looks correct

  Scenario: Checkout form validation
    Given I visit the checkout page
    When I fill in the email with "test@"
    And I click submit
    Then the "checkout-validation" looks correct
