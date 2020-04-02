import React, { useState, createRef } from 'react'
import { useToasts } from 'react-toast-notifications'
import { Link, useHistory } from 'react-router-dom'

import { useEnterSubmit } from '../../shares/use-enter-submit'
import * as service from '../../services'

import './LoginPage.scss'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const domRef = createRef<HTMLDivElement>()
  const { addToast } = useToasts()

  useEnterSubmit(attemptSubmit, domRef)

  async function attemptSubmit() {
    if (!username)
      return addToast('Username is empty', {
        appearance: 'error',
        autoDismiss: true,
      })
    if (!password)
      return addToast('Password is empty', {
        appearance: 'error',
        autoDismiss: true,
      })

    try {
      await service.login(username, password)
      addToast('Create User Success', {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/')
    } catch (error) {
      addToast(error.message, {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }
  return (
    <div className="LoginPage box" ref={domRef}>
      <div className="field is-horizontal title-group">
        <h4 className="subtitle is-4">Login Page</h4>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Username:</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                type="text"
                placeholder="e.g: Kamejoko"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Password:</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <input
                className="input is-primary"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal button-group">
        <button className="button is-danger">Cancel</button>
        <button className="button is-primary" onClick={attemptSubmit}>
          Login
        </button>
        <Link to="/register">Don't have account?</Link>
      </div>
    </div>
  )
}
