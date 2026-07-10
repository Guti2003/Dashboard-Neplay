/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'catalog.dashboard.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/dashboard/stats',
    tokens: [{"old":"/api/v1/dashboard/stats","type":0,"val":"api","end":""},{"old":"/api/v1/dashboard/stats","type":0,"val":"v1","end":""},{"old":"/api/v1/dashboard/stats","type":0,"val":"dashboard","end":""},{"old":"/api/v1/dashboard/stats","type":0,"val":"stats","end":""}],
    types: placeholder as Registry['catalog.dashboard.index']['types'],
  },
  'catalog.search.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/search',
    tokens: [{"old":"/api/v1/search","type":0,"val":"api","end":""},{"old":"/api/v1/search","type":0,"val":"v1","end":""},{"old":"/api/v1/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['catalog.search.index']['types'],
  },
  'catalog.platforms.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/platforms',
    tokens: [{"old":"/api/v1/platforms","type":0,"val":"api","end":""},{"old":"/api/v1/platforms","type":0,"val":"v1","end":""},{"old":"/api/v1/platforms","type":0,"val":"platforms","end":""}],
    types: placeholder as Registry['catalog.platforms.index']['types'],
  },
  'catalog.platforms.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/platforms/:slug',
    tokens: [{"old":"/api/v1/platforms/:slug","type":0,"val":"api","end":""},{"old":"/api/v1/platforms/:slug","type":0,"val":"v1","end":""},{"old":"/api/v1/platforms/:slug","type":0,"val":"platforms","end":""},{"old":"/api/v1/platforms/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['catalog.platforms.show']['types'],
  },
  'catalog.platforms.update': {
    methods: ["PUT"],
    pattern: '/api/v1/platforms/:slug',
    tokens: [{"old":"/api/v1/platforms/:slug","type":0,"val":"api","end":""},{"old":"/api/v1/platforms/:slug","type":0,"val":"v1","end":""},{"old":"/api/v1/platforms/:slug","type":0,"val":"platforms","end":""},{"old":"/api/v1/platforms/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['catalog.platforms.update']['types'],
  },
  'catalog.accounts.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/platforms/:slug/accounts',
    tokens: [{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"api","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"v1","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"platforms","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":1,"val":"slug","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"accounts","end":""}],
    types: placeholder as Registry['catalog.accounts.index']['types'],
  },
  'catalog.accounts.store': {
    methods: ["POST"],
    pattern: '/api/v1/platforms/:slug/accounts',
    tokens: [{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"api","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"v1","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"platforms","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":1,"val":"slug","end":""},{"old":"/api/v1/platforms/:slug/accounts","type":0,"val":"accounts","end":""}],
    types: placeholder as Registry['catalog.accounts.store']['types'],
  },
  'catalog.accounts.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/accounts/:id',
    tokens: [{"old":"/api/v1/accounts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.accounts.show']['types'],
  },
  'catalog.accounts.update': {
    methods: ["PUT"],
    pattern: '/api/v1/accounts/:id',
    tokens: [{"old":"/api/v1/accounts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.accounts.update']['types'],
  },
  'catalog.accounts.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/accounts/:id',
    tokens: [{"old":"/api/v1/accounts/:id","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.accounts.destroy']['types'],
  },
  'catalog.accounts.renew': {
    methods: ["POST"],
    pattern: '/api/v1/accounts/:id/renew',
    tokens: [{"old":"/api/v1/accounts/:id/renew","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id/renew","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id/renew","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id/renew","type":1,"val":"id","end":""},{"old":"/api/v1/accounts/:id/renew","type":0,"val":"renew","end":""}],
    types: placeholder as Registry['catalog.accounts.renew']['types'],
  },
  'catalog.profiles.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/accounts/:id/profiles',
    tokens: [{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id/profiles","type":1,"val":"id","end":""},{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"profiles","end":""}],
    types: placeholder as Registry['catalog.profiles.index']['types'],
  },
  'catalog.profiles.store': {
    methods: ["POST"],
    pattern: '/api/v1/accounts/:id/profiles',
    tokens: [{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id/profiles","type":1,"val":"id","end":""},{"old":"/api/v1/accounts/:id/profiles","type":0,"val":"profiles","end":""}],
    types: placeholder as Registry['catalog.profiles.store']['types'],
  },
  'catalog.profiles.store_batch': {
    methods: ["POST"],
    pattern: '/api/v1/accounts/:id/profiles/batch',
    tokens: [{"old":"/api/v1/accounts/:id/profiles/batch","type":0,"val":"api","end":""},{"old":"/api/v1/accounts/:id/profiles/batch","type":0,"val":"v1","end":""},{"old":"/api/v1/accounts/:id/profiles/batch","type":0,"val":"accounts","end":""},{"old":"/api/v1/accounts/:id/profiles/batch","type":1,"val":"id","end":""},{"old":"/api/v1/accounts/:id/profiles/batch","type":0,"val":"profiles","end":""},{"old":"/api/v1/accounts/:id/profiles/batch","type":0,"val":"batch","end":""}],
    types: placeholder as Registry['catalog.profiles.store_batch']['types'],
  },
  'catalog.profiles.update': {
    methods: ["PUT"],
    pattern: '/api/v1/profiles/:id',
    tokens: [{"old":"/api/v1/profiles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/profiles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/profiles/:id","type":0,"val":"profiles","end":""},{"old":"/api/v1/profiles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.profiles.update']['types'],
  },
  'catalog.profiles.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/profiles/:id',
    tokens: [{"old":"/api/v1/profiles/:id","type":0,"val":"api","end":""},{"old":"/api/v1/profiles/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/profiles/:id","type":0,"val":"profiles","end":""},{"old":"/api/v1/profiles/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.profiles.destroy']['types'],
  },
  'catalog.profiles.renew': {
    methods: ["POST"],
    pattern: '/api/v1/profiles/:id/renew',
    tokens: [{"old":"/api/v1/profiles/:id/renew","type":0,"val":"api","end":""},{"old":"/api/v1/profiles/:id/renew","type":0,"val":"v1","end":""},{"old":"/api/v1/profiles/:id/renew","type":0,"val":"profiles","end":""},{"old":"/api/v1/profiles/:id/renew","type":1,"val":"id","end":""},{"old":"/api/v1/profiles/:id/renew","type":0,"val":"renew","end":""}],
    types: placeholder as Registry['catalog.profiles.renew']['types'],
  },
  'catalog.clients.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['catalog.clients.index']['types'],
  },
  'catalog.clients.store': {
    methods: ["POST"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['catalog.clients.store']['types'],
  },
  'catalog.clients.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.clients.show']['types'],
  },
  'catalog.clients.update': {
    methods: ["PUT"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.clients.update']['types'],
  },
  'catalog.clients.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['catalog.clients.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
