import React from 'react'
import { shallow } from 'enzyme'
import { useToasts } from 'react-toast-notifications'
import { useHistory } from 'react-router-dom'

import { register } from '../../services'
import RegisterPage from './RegisterPage'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}))
jest.mock('react-toast-notifications')
jest.mock('../../services')

describe('<RegisterPage />', () => {
  const mockUseToast = useToasts as jest.Mock<any>
  const mockRegisterService = register as jest.Mock<any>
  const mockUseHistory = useHistory as jest.Mock<any>
  const mockHistoryPush = jest.fn()
  const mockAddToast = jest.fn()

  beforeEach(() => {
    mockUseToast.mockImplementation(() => ({ addToast: mockAddToast }))
    mockUseHistory.mockImplementation(() => ({ push: mockHistoryPush }))
  })

  afterEach(() => {
    mockUseToast.mockRestore()
    mockUseHistory.mockRestore()
  })

  it('[UI] Snapshot', () => {
    const wrapper = shallow(<RegisterPage />)
    expect(wrapper).toMatchSnapshot()
  })

  it('[LOGIC] Empty username should show an error toast', () => {
    const wrapper = shallow(<RegisterPage />)
    const submitSelector = '.button-group button.is-primary'

    wrapper.find(submitSelector).simulate('click')

    expect(mockAddToast).toBeCalledWith('Username is empty', {
      appearance: 'error',
      autoDismiss: true,
    })
  })

  it('[LOGIC] Empty password should show an error toast', async () => {
    const wrapper = shallow(<RegisterPage />)

    const usernameSelector = '.field-body input[type="text"]'
    const submitSelector = '.button-group button.is-primary'

    wrapper
      .find(usernameSelector)
      .simulate('change', { target: { value: 'kame' } })
    wrapper.find(submitSelector).simulate('click')

    expect(mockAddToast).toBeCalledWith('Password is empty', {
      appearance: 'error',
      autoDismiss: true,
    })
  })

  it('[LOGIC] Wrong username or password should show an error toast', async () => {
    const errMessage = 'kamejok'
    mockRegisterService.mockImplementation(() =>
      Promise.reject(new Error(errMessage))
    )

    const wrapper = shallow(<RegisterPage />)

    const usernameSelector = '.field-body input[type="text"]'
    const passwordSelector = '.field-body input[type="password"]'
    const submitSelector = '.button-group button.is-primary'

    const usernameVal = 'asdfdfe'
    const passwordVal = 'asdjfls'

    wrapper
      .find(usernameSelector)
      .simulate('change', { target: { value: usernameVal } })
    wrapper
      .find(passwordSelector)
      .simulate('change', { target: { value: passwordVal } })
    wrapper.find(submitSelector).simulate('click')

    await Promise.resolve()

    expect(mockRegisterService).toBeCalledWith(usernameVal, passwordVal)
    expect(mockAddToast).toBeCalledWith(errMessage, {
      appearance: 'error',
      autoDismiss: true,
    })
  })

  it('[LOGIC] Register success should show a success toast', async () => {
    mockRegisterService.mockImplementation(() => Promise.resolve())

    const wrapper = shallow(<RegisterPage />)

    const usernameSelector = '.field-body input[type="text"]'
    const passwordSelector = '.field-body input[type="password"]'
    const submitSelector = '.button-group button.is-primary'

    const usernameVal = 'asdfdfe'
    const passwordVal = 'asdjfls'

    wrapper
      .find(usernameSelector)
      .simulate('change', { target: { value: usernameVal } })
    wrapper
      .find(passwordSelector)
      .simulate('change', { target: { value: passwordVal } })
    wrapper.find(submitSelector).simulate('click')

    await Promise.resolve()

    expect(mockRegisterService).toBeCalledWith(usernameVal, passwordVal)
    expect(mockAddToast).toBeCalledWith('Create User Success', {
      appearance: 'success',
      autoDismiss: true,
    })
  })

  it('[LOGIC] Register success should save token to localStorage', async () => {
    mockRegisterService.mockImplementation(() => Promise.resolve())

    const wrapper = shallow(<RegisterPage />)

    const usernameSelector = '.field-body input[type="text"]'
    const passwordSelector = '.field-body input[type="password"]'
    const submitSelector = '.button-group button.is-primary'

    const usernameVal = 'asdfdfe'
    const passwordVal = 'asdjfls'

    wrapper
      .find(usernameSelector)
      .simulate('change', { target: { value: usernameVal } })
    wrapper
      .find(passwordSelector)
      .simulate('change', { target: { value: passwordVal } })
    wrapper.find(submitSelector).simulate('click')

    await Promise.resolve()
    expect(mockHistoryPush).toBeCalledWith('/login')
  })
})
