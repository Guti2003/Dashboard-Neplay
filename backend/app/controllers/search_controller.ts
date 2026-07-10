import type { HttpContext } from '@adonisjs/core/http'
import SearchService from '#services/search_service'
import SearchTransformer from '#transformers/search_transformer'
import { searchValidator } from '#validators/search'

export default class SearchController {
  async index({ request, serialize }: HttpContext) {
    const { q } = await request.validateUsing(searchValidator)
    const results = await SearchService.search(q)

    return serialize(SearchTransformer.transform(results))
  }
}
