import React from 'react'
import { shallow } from 'enzyme'

import LoginPage from '../RegisterPage'

describe('[UI] LoginPage', () => {
  it('Match snapshot', () => {
    const wrapper = shallow(<LoginPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
