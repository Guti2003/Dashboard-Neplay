export type AccountStatus = 'activo' | 'suspendido' | 'vencido';

export interface Account {
  id: number;
  platformId: number;
  email: string;
  password: string;
  status: AccountStatus;
  observations: string | null;
  profilesCount: number;
  renewedAt: string;
  daysRemaining: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountFormValue {
  email: string;
  password: string;
  status: AccountStatus;
  observations: string;
}

export interface ListAccountsParams {
  search?: string;
  status?: AccountStatus | '';
  sortBy?: 'email' | 'status' | 'createdAt';
  sortDir?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}
