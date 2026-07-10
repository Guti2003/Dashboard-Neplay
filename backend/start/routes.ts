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

        router.get('platforms', [controllers.Platforms, 'index'])

        router.get('platforms/:slug/accounts', [controllers.Accounts, 'index'])
        router.post('platforms/:slug/accounts', [controllers.Accounts, 'store'])
        router.put('accounts/:id', [controllers.Accounts, 'update'])
        router.delete('accounts/:id', [controllers.Accounts, 'destroy'])

        router.get('accounts/:id/profiles', [controllers.Profiles, 'index'])
        router.post('accounts/:id/profiles', [controllers.Profiles, 'store'])
        router.put('profiles/:id', [controllers.Profiles, 'update'])
        router.delete('profiles/:id', [controllers.Profiles, 'destroy'])
      })
      .as('catalog')
      .use(middleware.jwt())
  })
  .prefix('/api/v1')
