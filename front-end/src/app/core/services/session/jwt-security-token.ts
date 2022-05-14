export class JwtSecurityToken {

  constructor(
    public readonly access_token: string,
    public readonly expires_in: number,
    public readonly token_type: string
  ) { }
}
