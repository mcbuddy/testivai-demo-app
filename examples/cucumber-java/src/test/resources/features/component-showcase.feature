Feature: Component Showcase - Cucumber Java

  As a user
  I want to view the component showcase page
  So that I can see all available components

  Background:
    Given I navigate to the component showcase page

  Scenario: Display the component showcase page
    Then I should see the heading "Component Showcase"
    And I should see the description "A collection of reusable React components"

  Scenario: Display all component sections
    Then I should see the "Alert Components" section
    And I should see the "Button Components" section
    And I should see the "Card Components" section

  Scenario: Display alert components with correct variants
    Then I should see a success alert with message "Your changes have been saved successfully!"
    And I should see an error alert with message "There was an error processing your request"

  Scenario: Display button components with correct variants
    Then I should see a primary button with text "Primary Button"
    And I should see a secondary button with text "Secondary Button"
    And I should see a disabled button with text "Disabled Button"

  Scenario: Display card components
    Then I should see 3 cards
    And the first card should have title "Beautiful Landscape"
    And the first card should have text "Discover breathtaking views"
    And I should see 3 card images

  Scenario: Interactive buttons
    When I click the primary button
    Then I should see an alert dialog

  Scenario: Visual regression - full page screenshot
    Then I take a full page screenshot named "component-showcase-full-page"

  Scenario: Visual regression - header section
    Then I take a screenshot of the header section named "component-showcase-header"

  Scenario: Visual regression - alert components
    Then I take a screenshot of the alert components named "component-showcase-alerts"

  Scenario: Visual regression - button components
    Then I take a screenshot of the button components named "component-showcase-buttons"

  Scenario: Visual regression - card components
    Then I take a screenshot of the card components named "component-showcase-cards"

  Scenario: Responsive design - mobile viewport
    When I resize the window to mobile size 375x667
    Then I should see the component showcase page
    And I take a screenshot named "component-showcase-mobile"

  Scenario: Responsive design - tablet viewport
    When I resize the window to tablet size 768x1024
    Then I take a screenshot named "component-showcase-tablet"
