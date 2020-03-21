import React from 'react'
import { Link } from 'react-router-dom'

import './RegisterPage.scss'

export default function RegisterPage() {
  return (
    <div className="RegisterPage box">
      <div className="field is-horizontal title-group">
        <h4 className="subtitle is-4">Register Page</h4>
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
        <Link to="/login">Already have account?</Link>
      </div>
    </div>
  )
}
