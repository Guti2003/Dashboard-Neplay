import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'catalog.dashboard.index': { paramsTuple?: []; params?: {} }
    'catalog.search.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.platforms.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.index': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.store': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.accounts.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.accounts.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.accounts.renew': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.store_batch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.renew': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.index': { paramsTuple?: []; params?: {} }
    'catalog.clients.store': { paramsTuple?: []; params?: {} }
    'catalog.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'catalog.dashboard.index': { paramsTuple?: []; params?: {} }
    'catalog.search.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.index': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.index': { paramsTuple?: []; params?: {} }
    'catalog.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'catalog.dashboard.index': { paramsTuple?: []; params?: {} }
    'catalog.search.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.index': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.index': { paramsTuple?: []; params?: {} }
    'catalog.clients.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'catalog.accounts.store': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.renew': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.store_batch': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.renew': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'catalog.platforms.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'catalog.accounts.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.clients.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}