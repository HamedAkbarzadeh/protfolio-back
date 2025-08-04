import {AcceptLanguageResolver, HeaderResolver, I18nJsonLoader, I18nOptions, QueryResolver} from "nestjs-i18n";
import { join } from "path";


export const i18nOptions : I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '../i18n/'),
    watch: true
  },
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang'])
  ]


}