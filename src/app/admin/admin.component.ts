import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';

@Component({ templateUrl: 'admin.component.html',

styleUrls: [ './admin.component.css' ]})
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
  show =false;
    data = [
        { name:'Test', lastname:'TestLname' },
        { name:'Test1', lastname:'Test1Lname' },
        { name:'Test2', lastname:'Test2Lname' },
        { name:'Test3', lastname:'Test3Lname' },

    ];
    dataSource = this.data;


    selected = [];
    
    // @ViewChild('table') table: DatatableComponent;
    rows = [];
    isEditable = {};
    // employees=[{name:"test"}];

    constructor(private userService: UserService) {
      // this.employees=[{name:"test"}]
     }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });


        // this.rows = this.data;
        // this.rows.forEach(row => 
        //   {
        //     let testArr = []; 
        //     row.nota.forEach(nota => {testArr.push(nota.test)});
        //     row.selected = testArr;
        //   }
        // )
        // console.log(this.rows) 
    }

    // Save row
  

  

  deleteRows(x){
    var delBtn = confirm(" Do you want to delete ?");
    if ( delBtn == true ) {
      this.data.splice(x, 1 );
    }   
  } 
}
// export class Employee{
//   name:string;
// }
