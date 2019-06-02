import { Component, OnInit } from '@angular/core';

var columns = [
  { attribute: "id", type: "number", title: "Id" },
  { attribute: "firstName", type: "string", title: "First Name" },
  { attribute: "lastName", type: "string", title: "Last Name" },
  { attribute: "birthday", type: "date", title: "Birthday" },
  { attribute: "married", type: "boolean", title: "Married" }
];

var rows = [
  { id: 123, firstName: "Joe", lastName: "Smith", birthday: new Date(1975, 7, 1), married: true },
  { id: 444, firstName: "Mary", lastName: "Muster", birthday: new Date(1990, 1, 2), married: false },
  { id: 468, firstName: "John", lastName: "Gonzalez", birthday: new Date(1955, 2, 3), married: true }
]

@Component({
  selector: 'app-netflix',
  templateUrl: './netflix.component.html',
  styleUrls: ['./netflix.component.css']
})
export class NetflixComponent implements OnInit {
  public image: string = 'src/assets/images/netfilx.png';
  constructor() { }
  ngOnInit() {
  }

  render() {
    const table = document.getElementById('fillMe');
    let headers = document.createElement('tr');
    for (const column in columns) {
      headers.innerHTML += `<th>${columns[column].title}</th>`;
    }
    table.appendChild(headers);
    for (const row in rows) {
      let rowItem = document.createElement('tr');
      for (const field in rows[row]) {
        const text = typeof rows[row][field] === 'boolean'
          ? rows[row][field] ? 'yes' : 'No'
          : typeof rows[row][field] === 'object'
            ? formatDate(rows[row][field])
            : rows[row][field];
        rowItem.innerHTML += `<td>${text}</td>`;
      }
      table.appendChild(rowItem);
    }
  }
}

function formatDate(date) {
  const dateSplit = String(date).split(' ');
  const dateFormated = `${dateSplit[2]}/${months[dateSplit[1]]()}/${dateSplit[3]}`;
  return dateFormated;
}

const months = {
  Feb: () => '02',
  Aug: () => '08',
  Mar: () => '03'
}


