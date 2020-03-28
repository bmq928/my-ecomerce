import { sessionRepo } from "../repositories";

export async function removeSession(
  ip: string,
  userAgent: string
): Promise<void> {

  await sessionRepo.remove(ip, userAgent)
}
