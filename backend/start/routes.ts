/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.jwt())

    router
      .group(() => {
        router.get('dashboard/stats', [controllers.Dashboard, 'index'])

        router.get('search', [controllers.Search, 'index'])

        router.get('platforms', [controllers.Platforms, 'index'])

        router.get('platforms/:slug', [controllers.Platforms, 'show'])
        router.put('platforms/:slug', [controllers.Platforms, 'update'])

        router.get('platforms/:slug/accounts', [controllers.Accounts, 'index'])
        router.post('platforms/:slug/accounts', [controllers.Accounts, 'store'])
        router.get('accounts/:id', [controllers.Accounts, 'show'])
        router.put('accounts/:id', [controllers.Accounts, 'update'])
        router.delete('accounts/:id', [controllers.Accounts, 'destroy'])
        router.post('accounts/:id/renew', [controllers.Accounts, 'renew'])

        router.get('accounts/:id/profiles', [controllers.Profiles, 'index'])
        router.post('accounts/:id/profiles', [controllers.Profiles, 'store'])
        router.post('accounts/:id/profiles/batch', [controllers.Profiles, 'storeBatch'])
        router.put('profiles/:id', [controllers.Profiles, 'update'])
        router.delete('profiles/:id', [controllers.Profiles, 'destroy'])
        router.post('profiles/:id/renew', [controllers.Profiles, 'renew'])

        router.get('clients', [controllers.Clients, 'index'])
        router.post('clients', [controllers.Clients, 'store'])
        router.get('clients/:id', [controllers.Clients, 'show'])
        router.put('clients/:id', [controllers.Clients, 'update'])
        router.delete('clients/:id', [controllers.Clients, 'destroy'])
      })
      .as('catalog')
      .use(middleware.jwt())
  })
  .prefix('/api/v1')
