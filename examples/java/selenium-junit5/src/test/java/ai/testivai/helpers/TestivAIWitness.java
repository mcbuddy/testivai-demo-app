package ai.testivai.helpers;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;

/**
 * TestivAI witness helper for Selenium Java
 * Captures a visual snapshot using the CDP SDK
 */
public class TestivAIWitness {
    
    /**
     * Capture a TestivAI visual snapshot
     * @param driver The WebDriver instance
     * @param name The name of the snapshot
     * @return The result from TestivAI
     */
    public static Object witness(WebDriver driver, String name) {
        return ((JavascriptExecutor) driver).executeScript("return window.testivaiWitness(arguments[0])", name);
    }
}
