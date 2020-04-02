import { UserAccount } from '@buy1s/account-entity'
import { ACCOUNT_SVC } from './hosts'

export async function register(
  username: string,
  password: string
): Promise<UserAccount | null> {
  const url = `${ACCOUNT_SVC}/register`
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
  return respData as UserAccount
}
