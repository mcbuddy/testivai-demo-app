*** Settings ***
Library    SeleniumLibrary

*** Keywords ***
Witness
    [Arguments]    ${name}
    Execute Javascript    return window.testivaiWitness('${name}')

Open TestivAI Browser
    [Arguments]    ${url}
    ${chrome_options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys
    Call Method    ${chrome_options}    add_argument    --remote-debugging-port=9222
    Call Method    ${chrome_options}    add_argument    --headless
    Create Webdriver    Chrome    options=${chrome_options}
    Go To    ${url}
