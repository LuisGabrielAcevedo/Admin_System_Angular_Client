import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TableService {
    constructor(private http: HttpClient) {
    }

    formatText(item: object, field: string): Promise<string> {
        let text = '';
        return new Promise((resolve, reject) => {
            if (field.indexOf('.') !== -1) {
            const fieldSplit_1 = field.split('.');
            if (!item[fieldSplit_1[0]]) {
                resolve(text);
            }
            switch (fieldSplit_1.length) {
                case 1:
                text = item[fieldSplit_1[0]];
                break;
                case 2:
                text = item[fieldSplit_1[0]][fieldSplit_1[1]];
                break;
                case 3:
                text = item[fieldSplit_1[0]][fieldSplit_1[1]][fieldSplit_1[2]];
                break;
                case 4:
                text = item[fieldSplit_1[0]][fieldSplit_1[1]][fieldSplit_1[2]][fieldSplit_1[3]];
                break;
            }
            resolve(text);
            } else if (field.indexOf(',') !== -1) {
                const fieldSplit_2 = field.split(',');
                fieldSplit_2.forEach(element => {
                    text += item[element] + ' ';
                });
                resolve(text);
            } else if (field.indexOf('/a/') !== -1) {
                const fieldSplit_3 = field.split('/a/');
                text = item[fieldSplit_3[0]] + ' ' + fieldSplit_3[1];
                resolve(text);
            } else if (field.indexOf('/b/') !== -1) {
                const fieldSplit_3 = field.split('/b/');
                text = fieldSplit_3[1] + ' ' + item[fieldSplit_3[0]];
                resolve(text);
            } else {
                text = item[field];
                resolve(text);
            }
        });
    }
}
