import { Injectable } from '@angular/core';
import { FileContent } from '../models/file-content';
import { AllowedFormat } from '../models/allowed-format.enum';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  public fileFromEvent(event: Event): File {
    if (event && event.target) {
      const inputFile = event.target as HTMLInputElement;
      if (inputFile.files && inputFile.files.length > 0) {
        return inputFile.files[0];
      }
    }
    return null;
  }

  public readBase64(
    file: File,
    callback: (base64?: string, format?: string, file?: File) => void
  ) {
    if (!file || !callback) return;
    const reader = new FileReader();
    reader.onload = (res: ProgressEvent) => {
      const dataUrl = (res.target as FileReader).result as string;
      const regexResult = dataUrl.match(/data:(.*);base64,(.*)/);
      const format = regexResult[1] || '';
      const base64 = regexResult[2] || '';
      callback(base64, format, file);
    };
    reader.readAsDataURL(file);
  }

  public readBase64FromEvent(
    event: Event,
    callback: (documentFile: FileContent, fileName?: File) => void
  ) {
    const prepareResult = (content: string, formatStr: string, file: File) => {
      const format: AllowedFormat = formatStr as AllowedFormat;
      const documentFile: FileContent = { content, format };
      if (callback) callback(documentFile, file);
    };
    this.readBase64(this.fileFromEvent(event), prepareResult);
  }

  public getSize(event: Event): number {
    const factor = 1024;
    const file = this.fileFromEvent(event);
    return Number(file.size / factor / factor);
  }

  public isValidType(event): boolean {
    const file = this.fileFromEvent(event);
    const typeOfFile = file.type;
    const allowedFormats = AllowedFormat;
    const validFile = Object.values(allowedFormats).filter(
      format => typeOfFile === format
    );
    return !!validFile.length;
  }
}
