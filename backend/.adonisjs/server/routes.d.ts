import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'catalog.dashboard.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.index': { paramsTuple?: []; params?: {} }
    'catalog.accounts.index': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.store': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.accounts.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.accounts.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'catalog.dashboard.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.index': { paramsTuple?: []; params?: {} }
    'catalog.accounts.index': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.profiles.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'catalog.dashboard.index': { paramsTuple?: []; params?: {} }
    'catalog.platforms.index': { paramsTuple?: []; params?: {} }
    'catalog.accounts.index': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.profiles.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'catalog.accounts.store': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'catalog.profiles.store': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'catalog.accounts.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'catalog.accounts.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'catalog.profiles.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}