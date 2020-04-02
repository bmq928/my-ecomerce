import { LoginSession } from '@buy1s/account-entity'
import { ACCOUNT_SVC } from './hosts'

export async function login(
  username: string,
  password: string
): Promise<LoginSession> {
  const url = `${ACCOUNT_SVC}/login`
  const bodyData = { username, password }
  const reqOpt = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  }
  const resp = await fetch(url, reqOpt)
  const respData = await resp.json()

  if (!resp.ok) throw new Error(respData.message)
  return respData as LoginSession
}
