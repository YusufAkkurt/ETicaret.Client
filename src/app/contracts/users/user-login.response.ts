export class Token{
	accessToken: string = "";
	expiration: Date = new Date();
}

export class UserLoginResponse{
	message: string = "";
	succeeded: boolean = false;
	token: Token = new Token();
}