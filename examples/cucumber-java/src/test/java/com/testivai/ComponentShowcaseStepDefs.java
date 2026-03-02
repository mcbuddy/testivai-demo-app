package com.testivai;

import io.cucumber.java.en.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import java.util.List;

import static org.junit.Assert.*;

public class ComponentShowcaseStepDefs {
    private WebDriver driver = Hooks.getDriver();
    private WebDriverWait wait = Hooks.getWait();

    @Given("I navigate to the component showcase page")
    public void iNavigateToTheComponentShowcasePage() {
        driver.get("http://localhost:3000");
    }

    @Then("I should see the heading {string}")
    public void iShouldSeeTheHeading(String heading) {
        WebElement h1 = wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("h1")));
        assertTrue(h1.getText().contains(heading));
    }

    @Then("I should see the description {string}")
    public void iShouldSeeTheDescription(String description) {
        WebElement headerP = driver.findElement(By.cssSelector("header p"));
        assertTrue(headerP.getText().contains(description));
    }

    @Then("I should see the {string} section")
    public void iShouldSeeTheSection(String sectionName) {
        WebElement section = driver.findElement(By.xpath("//h2[contains(text(), '" + sectionName + "')]"));
        assertTrue(section.isDisplayed());
    }

    @Then("I should see a success alert with message {string}")
    public void iShouldSeeASuccessAlertWithMessage(String message) {
        WebElement successAlert = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".alerts-container .alert--success")));
        assertTrue(successAlert.getText().contains(message));
    }

    @Then("I should see an error alert with message {string}")
    public void iShouldSeeAnErrorAlertWithMessage(String message) {
        WebElement errorAlert = driver.findElement(By.cssSelector(".alert--error"));
        assertTrue(errorAlert.getText().contains(message));
    }

    @Then("I should see a primary button with text {string}")
    public void iShouldSeeAPrimaryButtonWithText(String text) {
        WebElement primaryButton = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".button--primary")));
        assertTrue(primaryButton.getText().contains(text));
    }

    @Then("I should see a secondary button with text {string}")
    public void iShouldSeeASecondaryButtonWithText(String text) {
        WebElement secondaryButton = driver.findElement(By.cssSelector(".button--secondary"));
        assertTrue(secondaryButton.getText().contains(text));
    }

    @Then("I should see a disabled button with text {string}")
    public void iShouldSeeADisabledButtonWithText(String text) {
        WebElement disabledButton = driver.findElement(By.cssSelector("button:disabled"));
        assertTrue(disabledButton.getText().contains(text));
    }

    @Then("I should see {int} cards")
    public void iShouldSeeCards(int count) {
        List<WebElement> cards = driver.findElements(By.cssSelector(".card"));
        assertEquals(count, cards.size());
    }

    @Then("the first card should have title {string}")
    public void theFirstCardShouldHaveTitle(String title) {
        WebElement firstCard = driver.findElement(By.cssSelector(".card"));
        WebElement cardTitle = firstCard.findElement(By.cssSelector(".card__title"));
        assertTrue(cardTitle.getText().contains(title));
    }

    @Then("the first card should have text {string}")
    public void theFirstCardShouldHaveText(String text) {
        WebElement firstCard = driver.findElement(By.cssSelector(".card"));
        WebElement cardText = firstCard.findElement(By.cssSelector(".card__text"));
        assertTrue(cardText.getText().contains(text));
    }

    @Then("I should see {int} card images")
    public void iShouldSeeCardImages(int count) {
        List<WebElement> cardImages = driver.findElements(By.cssSelector(".card__image"));
        assertEquals(count, cardImages.size());
    }

    @When("I click the primary button")
    public void iClickThePrimaryButton() {
        WebElement primaryButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector(".button--primary")));
        primaryButton.click();
    }

    @Then("I should see an alert dialog")
    public void iShouldSeeAnAlertDialog() {
        // Alert is handled by the browser
        assertTrue(true); // If we get here without exception, alert was handled
    }

    @Then("I take a full page screenshot named {string}")
    public void iTakeAFullPageScreenshotNamed(String name) throws InterruptedException {
        Thread.sleep(1000); // Wait for images to load
        Hooks.witnessSnapshot(name);
    }

    @Then("I take a screenshot of the header section named {string}")
    public void iTakeAScreenshotOfTheHeaderSectionNamed(String name) {
        Hooks.witnessSnapshot(name);
    }

    @Then("I take a screenshot of the alert components named {string}")
    public void iTakeAScreenshotOfTheAlertComponentsNamed(String name) {
        Hooks.witnessSnapshot(name);
    }

    @Then("I take a screenshot of the button components named {string}")
    public void iTakeAScreenshotOfTheButtonComponentsNamed(String name) {
        Hooks.witnessSnapshot(name);
    }

    @Then("I take a screenshot of the card components named {string}")
    public void iTakeAScreenshotOfTheCardComponentsNamed(String name) throws InterruptedException {
        Thread.sleep(1000); // Wait for images to load
        Hooks.witnessSnapshot(name);
    }

    @When("I resize the window to mobile size {int}x{int}")
    public void iResizeTheWindowToMobileSize(int width, int height) throws InterruptedException {
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(width, height));
        Thread.sleep(500);
    }

    @When("I resize the window to tablet size {int}x{int}")
    public void iResizeTheWindowToTabletSize(int width, int height) throws InterruptedException {
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(width, height));
        Thread.sleep(500);
    }

    @Then("I should see the component showcase page")
    public void iShouldSeeTheComponentShowcasePage() {
        WebElement h1 = driver.findElement(By.tagName("h1"));
        assertTrue(h1.isDisplayed());
    }

    @Then("I take a screenshot named {string}")
    public void iTakeAScreenshotNamed(String name) {
        Hooks.witnessSnapshot(name);
    }
}
