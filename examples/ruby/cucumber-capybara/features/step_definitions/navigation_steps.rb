Given('I visit the homepage') do
  visit '/'
end

Given('I visit the checkout page') do
  visit '/checkout'
end

When('I fill in the email with {string}') do |email|
  fill_in 'email', with: email
end

When('I click submit') do
  click_button 'Submit'
end
