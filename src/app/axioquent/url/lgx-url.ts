export class LgxUrl {
  private url: string;
  private action: string | null;
  constructor(url: string, action?: string) {
    this.url = url;
    this.action = action ? action : null;
  }

  getUrl(): string {
    return this.url;
  }

  getAction(): string | null {
    return this.action;
  }
}
