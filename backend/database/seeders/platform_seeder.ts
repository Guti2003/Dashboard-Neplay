import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Platform from '#models/platform'

export default class extends BaseSeeder {
  async run() {
    await Platform.updateOrCreateMany('slug', [
      { name: 'Netflix', slug: 'netflix', color: '#E50914' },
      { name: 'Disney+', slug: 'disney', color: '#113CCF' },
      { name: 'Amazon Prime', slug: 'amazon-prime', color: '#00A8E1' },
    ])
  }
}