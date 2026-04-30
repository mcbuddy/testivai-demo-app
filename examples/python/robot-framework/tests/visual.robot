*** Settings ***
Resource    ../resources/testivai.robot
Suite Setup    Open TestivAI Browser    http://localhost:3000
Suite Teardown    Close All Browsers

*** Test Cases ***
Homepage Visual Test
    Witness    homepage

Navigation Bar Visual Test
    Witness    navbar

Product Cards Visual Test
    Execute Javascript    document.querySelector('.product-cards, [data-testid="product-cards"]').scrollIntoView(true)
    Sleep    0.5s
    Witness    product-cards

Checkout Form Visual Test
    Go To    http://localhost:3000/checkout
    Witness    checkout-form

Checkout Form Validation Visual Test
    Go To    http://localhost:3000/checkout
    Input Text    id=email    test@
    Click Button    Submit
    Sleep    1s
    Witness    checkout-validation
