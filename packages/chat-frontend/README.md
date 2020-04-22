# Antipattern
  1. 

  it('Empty password should show an error toast',async () => {
    const wrapper = shallow(<RegisterPage />)
    const usernameField = wrapper.find('.field-body input[type="text"]')
    const submitButton = wrapper.find('.button-group button.is-primary')

    usernameField.simulate('change', { target: { value: 'asdjl' } })
    submitButton.simulate('click')
  })

  => do this, usernameField will never simulate change but the submitButton do
  => can only asign 1 selector to a variable at a time  