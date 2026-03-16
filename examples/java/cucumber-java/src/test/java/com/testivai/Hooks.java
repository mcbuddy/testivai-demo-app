package com.testivai;

import io.cucumber.java.After;
import io.cucumber.java.AfterAll;
import io.cucumber.java.Before;
import io.cucumber.java.BeforeAll;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class Hooks {
    protected static WebDriver driver;
    protected static WebDriverWait wait;
    protected static final String BASE_URL = "http://localhost:3000";

    @BeforeAll
    public static void setupSuite() {
        // No setup needed for framework-agnostic approach
    }

    @Before
    public void setup() {
        if (driver == null) {
            // Setup WebDriver
            WebDriverManager.chromedriver().setup();
            
            ChromeOptions options = new ChromeOptions();
            if (System.getProperty("headless", "true").equals("true")) {
                options.addArguments("--headless");
            }
            options.addArguments("--no-sandbox");
            options.addArguments("--disable-dev-shm-usage");
            options.addArguments("--disable-gpu");
            options.addArguments("--remote-debugging-port=9222");
            
            driver = new ChromeDriver(options);
            driver.manage().window().setSize(new org.openqa.selenium.Dimension(1280, 720));
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        }
        
        driver.get(BASE_URL);
    }

    @AfterAll
    public static void teardownSuite() {
        if (driver != null) {
            driver.quit();
        }
        // No cleanup needed for framework-agnostic approach
    }

    public static WebDriver getDriver() {
        return driver;
    }

    public static WebDriverWait getWait() {
        return wait;
    }
    
    public static void witnessSnapshot(String name) {
        if (driver instanceof JavascriptExecutor) {
            ((JavascriptExecutor) driver).executeScript("return window.testivaiWitness('" + name + "')");
        }
    }
}
