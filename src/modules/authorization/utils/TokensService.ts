import {
  TokensSchema,
  TokensSchemaInfer,
} from '@modules/authorization/types/TokensSchema.ts';

export class TokensService {
  private static readonly Storage = localStorage;

  private static readonly AccessTokenKey = 'accessToken';

  private static readonly RefreshTokenKey = 'refreshToken';

  public static SetTokens(tokens: TokensSchemaInfer) {
    TokensService.SetAccessToken(tokens.accessToken);
    TokensService.SetRefreshToken(tokens.refreshToken);
  }

  public static SetAccessToken(accessToken: TokensSchemaInfer['accessToken']) {
    this.Storage.setItem(this.AccessTokenKey, accessToken);
  }

  public static SetRefreshToken(
    refreshToken: TokensSchemaInfer['refreshToken'],
  ) {
    this.Storage.setItem(this.RefreshTokenKey, refreshToken);
  }

  public static GetTokens() {
    const tokens: TokensSchemaInfer = {
      accessToken: this.Storage.getItem(this.AccessTokenKey) ?? '',
      refreshToken: this.Storage.getItem(this.RefreshTokenKey) ?? '',
    };
    return TokensSchema.parse(tokens);
  }

  public static IsNotEmpty(inTokens?: TokensSchemaInfer) {
    const tokens = inTokens ?? TokensService.GetTokens();
    return tokens['accessToken'] !== '' && tokens['refreshToken'] !== '';
  }

  public static RemoveTokens() {
    this.Storage.removeItem(this.AccessTokenKey);
    this.Storage.removeItem(this.RefreshTokenKey);
  }
}
