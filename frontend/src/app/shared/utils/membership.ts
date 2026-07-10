export type MembershipVariant = 'ok' | 'warning' | 'danger';

/** Green while there's a healthy buffer, amber close to the deadline, red once overdue. */
export function membershipVariant(daysRemaining: number): MembershipVariant {
  if (daysRemaining <= 0) return 'danger';
  if (daysRemaining <= 5) return 'warning';
  return 'ok';
}

export function membershipLabel(daysRemaining: number): string {
  if (daysRemaining > 0) {
    return `Vence en ${daysRemaining} día${daysRemaining === 1 ? '' : 's'}`;
  }
  if (daysRemaining === 0) {
    return 'Vence hoy';
  }
  const overdue = Math.abs(daysRemaining);
  return `Vencido hace ${overdue} día${overdue === 1 ? '' : 's'}`;
}
