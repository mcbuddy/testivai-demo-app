require 'rspec'
require 'capybara'
require 'selenium-webdriver'
require 'webdrivers'

# Configure Capybara
Capybara.register_driver :chrome_headless do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--disable-gpu')
  options.add_argument('--remote-debugging-port=9222')
  
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.register_driver :chrome do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--remote-debugging-port=9222')
  
  Capybara::Selenium::Driver.new(app, browser: :chrome, options: options)
end

Capybara.configure do |config|
  config.default_driver = ENV['HEADLESS'] == 'false' ? :chrome : :chrome_headless
  config.default_max_wait_time = 10
  config.app_host = 'http://localhost:3000'
end

RSpec.configure do |config|
  config.before(:each, type: :feature) do
    Capybara.current_session.driver.browser.manage.window.resize_to(1280, 720)
  end
end
