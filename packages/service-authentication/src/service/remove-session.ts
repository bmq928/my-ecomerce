import { sessionRepo } from "../repository";

export async function removeSession(
  ip: string,
  userAgent: string
): Promise<void> {

  await sessionRepo.remove(ip, userAgent)
}
