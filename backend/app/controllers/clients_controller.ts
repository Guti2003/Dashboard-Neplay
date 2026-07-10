import type { HttpContext } from '@adonisjs/core/http'
import ClientService, { ClientHasProfilesError } from '#services/client_service'
import ClientTransformer from '#transformers/client_transformer'
import { createClientValidator, listClientsValidator, updateClientValidator } from '#validators/client'

export default class ClientsController {
  async show({ params, serialize }: HttpContext) {
    const client = await ClientService.findOrFail(params.id)

    return serialize(ClientTransformer.transform(client))
  }

  async index({ request, serialize }: HttpContext) {
    const options = await request.validateUsing(listClientsValidator)
    const clients = await ClientService.list(options)

    return serialize(ClientTransformer.paginate(clients.all(), clients.getMeta()))
  }

  async store({ request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(createClientValidator)
    const client = await ClientService.create(payload)

    response.status(201)
    return serialize(ClientTransformer.transform(client))
  }

  async update({ params, request, serialize }: HttpContext) {
    const client = await ClientService.findOrFail(params.id)
    const payload = await request.validateUsing(updateClientValidator, {
      meta: { clientId: client.id },
    })

    await ClientService.update(client, payload)

    return serialize(ClientTransformer.transform(client))
  }

  async destroy({ params, response }: HttpContext) {
    const client = await ClientService.findOrFail(params.id)

    try {
      await ClientService.delete(client)
    } catch (error) {
      if (error instanceof ClientHasProfilesError) {
        return response.conflict({ message: error.message })
      }
      throw error
    }

    return response.noContent()
  }
}
