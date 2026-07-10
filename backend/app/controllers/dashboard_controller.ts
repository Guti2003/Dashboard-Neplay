import type { HttpContext } from '@adonisjs/core/http'
import DashboardService from '#services/dashboard_service'
import PlatformTransformer from '#transformers/platform_transformer'

export default class DashboardController {
  async index({ serialize }: HttpContext) {
    const stats = await DashboardService.getStats()

    return serialize({
      platforms: PlatformTransformer.transform(stats.platforms),
      totalProfiles: stats.totalProfiles,
      availableProfiles: stats.availableProfiles,
      occupiedProfiles: stats.occupiedProfiles,
    })
  }
}
