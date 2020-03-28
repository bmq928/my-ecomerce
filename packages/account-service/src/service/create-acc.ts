import md5 from 'md5'
import { UserAccount } from '@entity/user-account'

import { BusinessError } from '../error-handler'
import { accountRepo } from '../repository'

export async function createAccount(acc: UserAccount): Promise<UserAccount> {
  const existedAcc = await accountRepo.findByUsername(acc.username)
  if (existedAcc) throw new BusinessError('account is existed')

  const hashedPassword = md5(acc.password)
  const accToCreate: UserAccount = {
    ...acc,
    password: hashedPassword,
  }
  const accResp: UserAccount = {
    ...acc,
    password: undefined,
  }

  await accountRepo.create(accToCreate)

  return accResp
}
