import React from 'react'
import { Link } from 'react-router-dom'

import './LoginPage.scss'

export default function LoginPage() {
  return (
    <div className="LoginPage box">
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
              />
            </div>
          </div>
        </div>
      </div>
      <div className="field is-horizontal button-group">
        <button className="button is-danger">Cancel</button>
        <button className="button is-primary">Login</button>
        <Link to="/register">Don't have account?</Link>
      </div>
    </div>
  )
}
