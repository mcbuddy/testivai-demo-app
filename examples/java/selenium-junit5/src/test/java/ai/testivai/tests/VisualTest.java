package ai.testivai.tests;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Duration;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import ai.testivai.helpers.TestivAIWitness;
import io.github.bonigarcia.wdm.WebDriverManager;

public class VisualTest {
    
    private static WebDriver driver;
    private static WebDriverWait wait;
    
    @BeforeAll
    static void setup() {
        // Setup Chrome driver with remote debugging for TestivAI
        WebDriverManager.chromedriver().setup();
        
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--remote-debugging-port=9222");
        options.addArguments("--headless");
        
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }
    
    @AfterAll
    static void teardown() {
        if (driver != null) {
            driver.quit();
        }
    }
    
    @Test
    void homepageLooksCorrect() {
        driver.get("http://localhost:3000");
        wait.until(ExpectedConditions.titleContains("TestivAI"));
        
        TestivAIWitness.witness(driver, "homepage");
    }
    
    @Test
    void navbarIsConsistent() {
        driver.get("http://localhost:3000");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("nav")));
        
        TestivAIWitness.witness(driver, "navbar");
    }
    
    @Test
    void productCardsRender() {
        driver.get("http://localhost:3000");
        
        // Scroll to product cards
        WebElement productSection = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.cssSelector(".product-cards, [data-testid='product-cards']"))
        );
        
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", productSection);
        
        // Wait for any lazy loading
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        TestivAIWitness.witness(driver, "product-cards");
    }
    
    @Test
    void checkoutFormLayout() {
        driver.get("http://localhost:3000/checkout");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector("form")));
        
        TestivAIWitness.witness(driver, "checkout-form");
    }
    
    @Test
    void checkoutFormValidation() {
        driver.get("http://localhost:3000/checkout");
        
        // Fill partial form to trigger validation
        WebElement emailInput = wait.until(
            ExpectedConditions.presenceOfElementLocated(By.cssSelector("#email, [name='email']"))
        );
        emailInput.sendKeys("test@");
        
        // Submit form
        WebElement submitButton = driver.findElement(By.cssSelector("button[type='submit'], [data-testid='submit']"));
        submitButton.click();
        
        // Wait for validation messages
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        
        TestivAIWitness.witness(driver, "checkout-validation");
    }
}
