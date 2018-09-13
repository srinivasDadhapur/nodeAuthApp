import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name:string;
  age:number;
  email:string;
  address:Address;
  hobbies:string[];
  posts:Post[];
  isEdit:boolean = false;

  constructor(private dataService: DataService) {

   
   }

  ngOnInit() {

    this.age = 25;
    this.name = 'Srinivas Dadhapur';
    this.email = 'srinivas.srinu17@gmail.com';
    this.address = {
      street : 'Some Street',
      city : 'Hyderabad'
    }
    this.hobbies = ['Watching Movies', 'Playing video games', 'sleeping'];

    this.dataService.getPosts().subscribe((posts)=>{
      console.log(posts);
      this.posts = posts;
    });
  }


  onClick(){
    this.name = 'Srini';
    this.hobbies.push('Coding');
  }

  addhobby(hobby){
    this.hobbies.unshift(hobby);
    return false;
  }

  deletehobby(hobby){
    for(let i = 0; i<this.hobbies.length; i++){
      if(this.hobbies[i] == hobby){
        this.hobbies.splice(i,1);
      }
    }
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }
  

}

interface Address {
  street:string,
  city:string
}


interface Post{
  id : number,
  title: string,
  body: string,
  userId: number

}