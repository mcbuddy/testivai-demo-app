require 'spec_helper'

feature 'Component Showcase - RSpec/Capybara', type: :feature do
  background do
    visit '/'
  end

  scenario 'should display the component showcase page' do
    expect(page).to have_content('Component Showcase')
    expect(page).to have_content('A collection of reusable React components')
  end

  scenario 'should display all component sections' do
    expect(page).to have_css('h2', text: 'Alert Components')
    expect(page).to have_css('h2', text: 'Button Components')
    expect(page).to have_css('h2', text: 'Card Components')
  end

  scenario 'should display alert components with correct variants' do
    within('.alerts-container') do
      expect(page).to have_css('.alert--success', text: 'Your changes have been saved successfully!')
      expect(page).to have_css('.alert--error', text: 'There was an error processing your request')
    end
  end

  scenario 'should display button components with correct variants' do
    expect(page).to have_css('.button--primary', text: 'Primary Button')
    expect(page).to have_css('.button--secondary', text: 'Secondary Button')
    expect(page).to have_button('Disabled Button', disabled: true)
  end

  scenario 'should display card components' do
    expect(page).to have_css('.card', count: 3)
    
    within('.card:first-child') do
      expect(page).to have_content('Beautiful Landscape')
      expect(page).to have_content('Discover breathtaking views')
    end
    
    expect(page).to have_css('.card__image', count: 3)
  end

  scenario 'should have interactive buttons' do
    accept_alert do
      click_button('Primary Button', match: :first)
    end
  end

  scenario 'visual regression - full page screenshot' do
    sleep(1) # Wait for images to load
    page.execute_script("return window.testivaiWitness('component-showcase-full-page')")
  end

  scenario 'visual regression - header section' do
    page.execute_script("return window.testivaiWitness('component-showcase-header')")
  end

  scenario 'visual regression - alert components' do
    page.execute_script("return window.testivaiWitness('component-showcase-alerts')")
  end

  scenario 'visual regression - button components' do
    page.execute_script("return window.testivaiWitness('component-showcase-buttons')")
  end

  scenario 'visual regression - card components' do
    sleep(1) # Wait for images to load
    page.execute_script("return window.testivaiWitness('component-showcase-cards')")
  end

  scenario 'responsive design - mobile viewport' do
    Capybara.current_session.driver.browser.manage.window.resize_to(375, 667)
    sleep(0.5)
    
    expect(page).to have_content('Component Showcase')
    expect(page).to have_css('.alerts-container .alert--success')
    expect(page).to have_css('.button--primary')
    expect(page).to have_css('.card', count: 3)
    
    page.execute_script("return window.testivaiWitness('component-showcase-mobile')")
  end

  scenario 'responsive design - tablet viewport' do
    Capybara.current_session.driver.browser.manage.window.resize_to(768, 1024)
    sleep(0.5)
    
    page.execute_script("return window.testivaiWitness('component-showcase-tablet')")
  end
end
