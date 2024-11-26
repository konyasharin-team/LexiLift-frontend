import {
  TokensSchema,
  TokensSchemaInfer,
} from '@modules/authorization/types/TokensSchema.ts';

export class TokensService {
  private static readonly Storage = localStorage;

  public static SetTokens(tokens: TokensSchemaInfer) {
    TokensService.SetAccessToken(tokens.accessToken);
    TokensService.SetRefreshToken(tokens.refreshToken);
  }

  public static SetAccessToken(accessToken: TokensSchemaInfer['accessToken']) {
    this.Storage.setItem('accessToken', accessToken);
  }

  public static SetRefreshToken(
    refreshToken: TokensSchemaInfer['refreshToken'],
  ) {
    this.Storage.setItem('refreshToken', refreshToken);
  }

  public static GetTokens() {
    const tokens: TokensSchemaInfer = {
      accessToken: this.Storage.getItem('accessToken') ?? '',
      refreshToken: this.Storage.getItem('refreshToken') ?? '',
    };
    return TokensSchema.parse(tokens);
  }

  public static IsNotEmpty(inTokens?: TokensSchemaInfer) {
    const tokens = inTokens ?? TokensService.GetTokens();
    return tokens['accessToken'] !== '' && tokens['refreshToken'] !== '';
  }
}
