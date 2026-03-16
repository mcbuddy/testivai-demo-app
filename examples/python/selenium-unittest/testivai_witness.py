"""
TestivAI witness helper for Selenium Python
Captures a visual snapshot using the CDP SDK
"""
def witness(driver, name):
    """Capture a TestivAI visual snapshot."""
    return driver.execute_script(f"return window.testivaiWitness('{name}')")
