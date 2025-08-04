import { Injectable } from '@nestjs/common'
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n'



@Injectable()
export class I18nBaseService {
  constructor(private readonly i18n: I18nService) {
  }

  public t(key: string, args?: TranslateOptions['args'], lang?: string) {
    return this.i18n.t(key, {
      lang: lang || I18nContext.current()?.lang || 'en',
      args
    })
  }
}
