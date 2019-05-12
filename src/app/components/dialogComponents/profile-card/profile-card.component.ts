import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableService } from 'src/app/components/sharedComponents/table/table.service';
import * as moment from 'moment';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
    loading: boolean = null;
    constructor(
        public dialogRef: MatDialogRef<ProfileCardComponent>,
        private tableService: TableService,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    formatImage(item: object, field: string) {
        return this.tableService.formatText(item, field);
    }

    formatText(item: object, field: string) {
        let text = this.tableService.formatText(item, field);
        if (['createdAt', 'updatedAt'].includes(field)) {
            const date: string = moment(text, "YYYY-MM-DDTHH:mm:ss.SSS[Z]").format('L');
            return date;
        } else {
            text = text ? text : 'Sin información';
            return text.length > 24 ? `${text.substr(0, 24)}...` : text;
        }
    }
}