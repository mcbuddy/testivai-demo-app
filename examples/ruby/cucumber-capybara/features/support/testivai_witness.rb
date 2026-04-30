module TestivaiWitness
  def witness(name)
    page.driver.browser.execute_script("return window.testivaiWitness('#{name}')")
  end
end

World(TestivaiWitness)
