import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators'
// import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
  // define the post,get,put,delete
  // create datacast using post method
  postDatacast(data:any){
    const excludeId=data
    delete excludeId.id 
    return this._http.post<any>("http://localhost:3000/posts/",excludeId).pipe(map((res:any)=>{
    
      return res;
    }))
  }

//   getDbDataCast  = async()=>{
//  axios.get("https://datacastbackend.herokuapp.com/api/datacast").then(res=>{

// console.log('data',res);
// })
// // return JSON.stringify(res.data);
//   }

  //get data using get method
  getDatacast(){
    return this._http.get<any>("http://localhost:3000/posts/").pipe(map((res:any)=>{

      return res;
    }))
  }
  //update
  updateDatacast(data:any , id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  //delete
  deleteDatacast(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }

}