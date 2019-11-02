import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class Base64Service {
  constructor(public sanitize: DomSanitizer) {}

  public buildUrl(format, content) {
    if (format === fromFormats.IMAGE_JPEG) {
      return toFormats.IMAGE_JPEG + content;
    }
  }

  public sanitizeUrl(url) {
    return this.sanitize.sanitize(SecurityContext.URL, url);
  }

  public sanitizeUrlStyle(sanitizedURL) {
    return this.sanitize.bypassSecurityTrustStyle(`url(${sanitizedURL})`);
  }
}

enum fromFormats {
  IMAGE_JPEG = 'image/jpeg'
}

enum toFormats {
  IMAGE_JPEG = 'data:image/jpeg;base64,'
}
