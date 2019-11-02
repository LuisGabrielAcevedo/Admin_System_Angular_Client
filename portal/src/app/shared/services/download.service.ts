import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  /**
   * Receive a base64 string, convert to blob, and download it
   * @param base64Str string base64 file
   * @param base64Type string file type
   * @param documentName string file name
   */
  public base64ToBlob(base64Str, base64Type, documentName) {
    const byteArrays = [];
    const byteCharacters = atob(base64Str);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
    const blob = new Blob(byteArrays, { type: base64Type });
    this.downloadFile(blob, documentName);
  }

  /**
   * Download the received blob
   * @param blob file
   * @param documentName document name, with extention
   */
  private downloadFile(blob: Blob, documentName: string) {
    saveAs(blob, `${documentName}`);
  }
}
