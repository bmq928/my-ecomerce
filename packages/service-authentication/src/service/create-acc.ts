import { UserAccount } from '@buy1s/entity/src/user-account'

import { accountRepo } from '../repository'

export async function createAccount(acc: UserAccount): Promise<UserAccount> {
  await accountRepo.create(acc)
  const created: UserAccount = {
    password: null,
    ...acc,
  }

  return created
}
