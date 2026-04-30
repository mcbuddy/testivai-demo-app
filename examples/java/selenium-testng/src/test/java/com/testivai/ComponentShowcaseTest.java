package com.testivai;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ComponentShowcaseTest extends BaseTest {

    @Test(description = "Should display the component showcase page")
    public void testDisplayComponentShowcasePage() {
        WebElement h1 = wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("h1")));
        assertThat(h1.getText()).contains("Component Showcase");
        
        WebElement headerP = driver.findElement(By.cssSelector("header p"));
        assertThat(headerP.getText()).contains("A collection of reusable React components");
    }

    @Test(description = "Should display all component sections")
    public void testDisplayAllComponentSections() {
        WebElement alertSection = driver.findElement(By.xpath("//h2[contains(text(), 'Alert Components')]"));
        assertThat(alertSection.isDisplayed()).isTrue();
        
        WebElement buttonSection = driver.findElement(By.xpath("//h2[contains(text(), 'Button Components')]"));
        assertThat(buttonSection.isDisplayed()).isTrue();
        
        WebElement cardSection = driver.findElement(By.xpath("//h2[contains(text(), 'Card Components')]"));
        assertThat(cardSection.isDisplayed()).isTrue();
    }

    @Test(description = "Should display alert components with correct variants")
    public void testDisplayAlertComponents() {
        WebElement successAlert = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".alerts-container .alert--success")));
        assertThat(successAlert.getText()).contains("Your changes have been saved successfully!");
        
        WebElement errorAlert = driver.findElement(By.cssSelector(".alert--error"));
        assertThat(errorAlert.getText()).contains("There was an error processing your request");
    }

    @Test(description = "Should display button components with correct variants")
    public void testDisplayButtonComponents() {
        WebElement primaryButton = wait.until(ExpectedConditions.visibilityOfElementLocated(
            By.cssSelector(".button--primary")));
        assertThat(primaryButton.getText()).contains("Primary Button");
        
        WebElement secondaryButton = driver.findElement(By.cssSelector(".button--secondary"));
        assertThat(secondaryButton.getText()).contains("Secondary Button");
        
        WebElement disabledButton = driver.findElement(By.cssSelector("button:disabled"));
        assertThat(disabledButton.getText()).contains("Disabled Button");
    }

    @Test(description = "Should display card components")
    public void testDisplayCardComponents() {
        List<WebElement> cards = driver.findElements(By.cssSelector(".card"));
        assertThat(cards).hasSize(3);
        
        WebElement firstCard = cards.get(0);
        WebElement cardTitle = firstCard.findElement(By.cssSelector(".card__title"));
        assertThat(cardTitle.getText()).contains("Beautiful Landscape");
        
        WebElement cardText = firstCard.findElement(By.cssSelector(".card__text"));
        assertThat(cardText.getText()).contains("Discover breathtaking views");
        
        List<WebElement> cardImages = driver.findElements(By.cssSelector(".card__image"));
        assertThat(cardImages).hasSize(3);
    }

    @Test(description = "Should have interactive buttons")
    public void testInteractiveButtons() {
        WebElement primaryButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.cssSelector(".button--primary")));
        
        // Handle alert
        driver.switchTo().alert();
        
        primaryButton.click();
    }

    @Test(description = "Visual regression - full page screenshot")
    public void testVisualRegressionFullPage() throws InterruptedException {
        Thread.sleep(1000); // Wait for images to load
        witnessSnapshot("component-showcase-full-page");
    }

    @Test(description = "Visual regression - header section")
    public void testVisualRegressionHeader() {
        witnessSnapshot("component-showcase-header");
    }

    @Test(description = "Visual regression - alert components")
    public void testVisualRegressionAlerts() {
        witnessSnapshot("component-showcase-alerts");
    }

    @Test(description = "Visual regression - button components")
    public void testVisualRegressionButtons() {
        witnessSnapshot("component-showcase-buttons");
    }

    @Test(description = "Visual regression - card components")
    public void testVisualRegressionCards() throws InterruptedException {
        Thread.sleep(1000); // Wait for images to load
        witnessSnapshot("component-showcase-cards");
    }

    @Test(description = "Responsive design - mobile viewport")
    public void testResponsiveMobile() throws InterruptedException {
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(375, 667));
        Thread.sleep(500);
        
        WebElement h1 = driver.findElement(By.tagName("h1"));
        assertThat(h1.isDisplayed()).isTrue();
        
        witnessSnapshot("component-showcase-mobile");
    }

    @Test(description = "Responsive design - tablet viewport")
    public void testResponsiveTablet() throws InterruptedException {
        driver.manage().window().setSize(new org.openqa.selenium.Dimension(768, 1024));
        Thread.sleep(500);
        
        witnessSnapshot("component-showcase-tablet");
    }
}
