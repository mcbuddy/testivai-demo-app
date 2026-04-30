require 'capybara'
require 'selenium-webdriver'

Capybara.configure do |config|
  # Configure Chrome with remote debugging for TestivAI
  Capybara.register_driver :selenium_chrome do |app|
    options = Selenium::WebDriver::Chrome::Options.new
    options.add_argument('--remote-debugging-port=9222')
    options.add_argument('--headless')
    
    Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
  end
  
  config.default_driver = :selenium_chrome
  config.app_host = 'http://localhost:3000'
  config.default_max_wait_time = 10
end
