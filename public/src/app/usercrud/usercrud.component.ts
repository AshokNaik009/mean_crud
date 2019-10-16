import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Users } from './user.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
export interface DialogData {
  uid: string;
  name: string;
  phone: string;
  email: string;
}
export interface DeleteData {
  uid: string;
  name: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-usercrud',
  templateUrl: './usercrud.component.html',
  styleUrls: ['./usercrud.component.css']
})
export class UsercrudComponent implements OnInit {

  dispalyedColumns = ['name', 'email', 'phone', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Users>();

  @ViewChild('table1', { read: MatSort }) firstDataSort: MatSort;
  @ViewChild('page1', { read: MatPaginator }) firstDataPaginator: MatPaginator


  constructor(public snackBar: MatSnackBar, public dialog: MatDialog, public http: HttpClient) { }

  ngOnInit() {

    const userdata = this.http.get('http://localhost:3000/api/user/getuser');

    userdata.subscribe((response: any) => {
      console.log(response);
      this.dataSource.data = response;
    });
  }


  //Add User Dialog
  addUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialog, {
      width: '750px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  //Delete User Dialog
  deleteUserDialog(uid): void {
    console.log(uid);
    const dialogRef = this.dialog.open(DeleteUserDialog, {
      width: '750px',
      data: {
        uid: uid,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  //Edit User Dialog
  editUserDialog(uid, name, email, phone): void {
    console.log(uid);
    const dialogRef = this.dialog.open(EditUserDialog, {
      width: '750px',
      data: {
        uid: uid,
        name: name,
        email: email,
        phone: phone,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }





  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.firstDataSort;
    this.dataSource.paginator = this.firstDataPaginator;
  }

}


//Dialog to Add User 
@Component({
  selector: 'createuser-dialog',
  templateUrl: 'createuser-dialog.html',
  styleUrls: ['./createuser-dialog.css']
})
export class CreateUserDialog implements OnInit {

  name;
  phone;
  email;

  complexForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateUserDialog>,
    public http: HttpClient,
    public fb: FormBuilder,
    public snackBar: MatSnackBar,
  ) {}


  ngOnInit() {
    this.complexForm = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]+$")])],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.email,])],
    })

  }


  submitForm() {

    var body = {
      uid: Math.floor((Math.random() * 100) + 1),
      name: this.name,
      phone: this.phone,
      email: this.email
    }
    this.http.post('http://localhost:3000/api/user/createuser', body).subscribe((response: any) => {
      if (response.data === "Duplicate Value") {
        this.snackBar.open('Invalid Value', '500', {
          duration: 5000
        });
      } else if (response.data === "New User Added") {
        this.snackBar.open('Value Added', '200', {
          duration: 5000
        });

        setTimeout(() => {
          this.dialogRef.close();
          window.location.reload();
        }, 1000)
      }
    });


  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}


//Dialog to Add User 
@Component({
  selector: 'edituser-dialog',
  templateUrl: 'edituser-dialog.html',
  styleUrls: ['./edituser-dialog.css']
})
export class EditUserDialog implements OnInit {

  name;
  phone;
  email;

  complexForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public http: HttpClient,
    public snackBar: MatSnackBar,
    public fb: FormBuilder,
  ) { }


  ngOnInit() {
    this.complexForm = this.fb.group({
      'name': [null, Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z]+$")])],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")])],
      'email': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.email,])],

    })
    console.log(this.data);
    this.name = this.data.name;
    this.email = this.data.email;
    this.phone = this.data.phone;

  }

  editUser() {


    console.log(this.data);
    var body = {
      name: this.name,
      phone: this.phone,
      email: this.email
    }

    this.http.put('http://localhost:3000/api/user/updateuser/' + this.data.uid, body).subscribe((response: any) => {
      if (response.data === "Invalid Value") {
        this.snackBar.open('Invalid Value', '500', {
          duration: 5000
        });
      } else if (response.data === "Records Updated") {
        this.snackBar.open('Records Upadated', '200', {
          duration: 5000
        });

        setTimeout(() => {
          this.dialogRef.close();
          window.location.reload();
        }, 1000)

      }
    });


  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}



//Dialog to Confirm Deletion
@Component({
  selector: 'deleteuser-dialog',
  templateUrl: 'deleteuser-dialog.html',
  styleUrls: ['./deleteuser-dialog.css']
})
export class DeleteUserDialog implements OnInit {



  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteData,
    public http: HttpClient,
    public snackBar: MatSnackBar,

  ) { }


  ngOnInit() {


  }

  deleteUser() {
    console.log(this.data);
    this.http.delete('http://localhost:3000/api/user/deleteuser/' + this.data.uid).subscribe((response: any) => {
      console.log(response)
      if (response.data === "Invalid Value") {
        this.snackBar.open('Invalid Value', '500', {
          duration: 5000
        });
      } else if (response.data === "Successfully deleted") {
        this.snackBar.open('Record Deleted', '200', {
          duration: 5000
        });
        setTimeout(() => {
          this.dialogRef.close();
          window.location.reload();
        }, 1000)
      }
    });
  }



  onNoClick(): void {
    this.dialogRef.close();
  }
}