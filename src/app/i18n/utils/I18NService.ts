import { z, ZodType } from 'zod';

export class I18NService {
  private static readonly Storage = localStorage;

  private static readonly LanguageAbbrKey = 'lang';

  public static SetLanguage<T extends string>(newAbbr: T) {
    this.Storage.setItem(this.LanguageAbbrKey, newAbbr);
  }

  public static GetLanguage<T extends string>(
    schema: ZodType = z.string(),
  ): T | null {
    const abbr = this.Storage.getItem(this.LanguageAbbrKey);
    if (abbr) return schema.parse(abbr);
    return null;
  }
}
