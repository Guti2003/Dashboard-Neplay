import { type SchemaRules } from '@adonisjs/lucid/types/schema_generator'

export default {
  tables: {
    /**
     * Unlike the users table, streaming account credentials must be
     * readable by the admin UI (show/hide password toggle), so we
     * override the default password column rule that hides it.
     */
    accounts: {
      columns: {
        password: {
          tsType: 'string',
          imports: [],
          decorators: [{ name: '@column' }],
        },
      },
    },
  },
} satisfies SchemaRules
