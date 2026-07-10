import { DateTime } from 'luxon'

const CYCLE_DAYS = 30

/**
 * Every account/profile membership runs on a 30-day cycle. Returns how many
 * days are left (negative once it's overdue) counted from whenever the
 * cycle last restarted (account renewal, or a profile's last assignment).
 */
export function daysRemaining(cycleStart: DateTime): number {
  const expiresAt = cycleStart.plus({ days: CYCLE_DAYS })
  return Math.ceil(expiresAt.diff(DateTime.now(), 'days').days)
}
