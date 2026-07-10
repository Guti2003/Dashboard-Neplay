import type { HttpContext } from '@adonisjs/core/http'
import AccountService from '#services/account_service'
import AccountTransformer from '#transformers/account_transformer'
import {
  createAccountValidator,
  listAccountsValidator,
  updateAccountValidator,
} from '#validators/account'

/**
 * Reusable CRUD for streaming accounts. Nested under a platform slug
 * (netflix, disney, amazon-prime, ...) so the same controller/service serves
 * every platform instead of duplicating a CRUD per platform.
 */
export default class AccountsController {
  async show({ params, serialize }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)

    return serialize(AccountTransformer.transform(account))
  }

  async index({ params, request, serialize }: HttpContext) {
    const platform = await AccountService.findPlatformBySlug(params.slug)
    const options = await request.validateUsing(listAccountsValidator)

    const accounts = await AccountService.list(platform.id, options)

    return serialize(AccountTransformer.paginate(accounts.all(), accounts.getMeta()))
  }

  async store({ params, request, response, serialize }: HttpContext) {
    const platform = await AccountService.findPlatformBySlug(params.slug)
    const payload = await request.validateUsing(createAccountValidator)

    const account = await AccountService.create(platform.id, payload)

    response.status(201)
    return serialize(AccountTransformer.transform(account))
  }

  async update({ params, request, serialize }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)
    const payload = await request.validateUsing(updateAccountValidator)

    await AccountService.update(account, payload)

    return serialize(AccountTransformer.transform(account))
  }

  async destroy({ params, response }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)
    await AccountService.delete(account)

    return response.noContent()
  }

  async renew({ params, serialize }: HttpContext) {
    const account = await AccountService.findOrFail(params.id)
    await AccountService.renew(account)

    return serialize(AccountTransformer.transform(account))
  }
}
