/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'catalog.dashboard.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/dashboard/stats'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['index']>>>
    }
  }
  'catalog.platforms.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/platforms'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/platforms_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/platforms_controller').default['index']>>>
    }
  }
  'catalog.accounts.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/platforms/:slug/accounts'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/account').listAccountsValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.accounts.store': {
    methods: ["POST"]
    pattern: '/api/v1/platforms/:slug/accounts'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/account').createAccountValidator)>>
      paramsTuple: [ParamValue]
      params: { slug: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/account').createAccountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.accounts.update': {
    methods: ["PUT"]
    pattern: '/api/v1/accounts/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/account').updateAccountValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/account').updateAccountValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.accounts.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/accounts/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/accounts_controller').default['destroy']>>>
    }
  }
  'catalog.profiles.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/accounts/:id/profiles'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQueryForGet<InferInput<(typeof import('#validators/profile').listProfilesValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['index']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.profiles.store': {
    methods: ["POST"]
    pattern: '/api/v1/accounts/:id/profiles'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/profile').createProfileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/profile').createProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.profiles.update': {
    methods: ["PUT"]
    pattern: '/api/v1/profiles/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/profile').updateProfileValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/profile').updateProfileValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'catalog.profiles.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/profiles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profiles_controller').default['destroy']>>>
    }
  }
}
