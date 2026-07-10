export interface ClientMembership {
  profileId: number;
  profileName: string;
  status: 'disponible' | 'ocupado';
  daysRemaining: number | null;
  accountId: number;
  accountEmail: string;
  platform: {
    id: number;
    name: string;
    slug: string;
    color: string;
  };
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  memberships?: ClientMembership[];
}

export interface ClientFormValue {
  name: string;
  phone: string;
}

export interface ListClientsParams {
  search?: string;
  sortBy?: 'name' | 'phone' | 'createdAt';
  sortDir?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}
