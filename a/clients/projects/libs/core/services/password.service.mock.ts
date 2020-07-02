export class PasswordServiceMock {
	getLevel(_password: string): number {
		return 1;
	}
}
