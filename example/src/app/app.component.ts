import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  weatherResponse;
  weatherAddress='Visakhapatnam';
  angForm: FormGroup;
  networkAvailability=false;

  ngOnInit(){
    this.networkAvailability = !navigator.onLine;
    this.weatherReport(this.weatherAddress);
    this.createForm();
  }

  constructor(private http: HttpClient,
    private fb: FormBuilder
  ){
    self.addEventListener('offline', () => {
      this.networkAvailability = true;
    })
    self.addEventListener('online', () => {
      this.networkAvailability = false;
    })

  }

  createForm() {
    this.angForm = this.fb.group({
      cityAddress: ['']});
  }

// searchCity = function(city){
//   console.log(city);
//   this.http.get('https://weatherappserverfords18.herokuapp.com/address?address='+city).subscribe(res => {
//     console.log(this.weatherAddress);
//     if(res.results.length>0){
//       this.weatherAddress[0]=res.results[0].address_components[0].long_name;
//       this.weatherAddress[1]=res.results[0].address_components[res.results[0].address_components.length-1].long_name;
//       this.weatherReport();
//     }else{
//       alert('Enter correct city');
//     }
//     // this.weatherAddress = res;
//     // console.log(this.weatherResponse);
//   })
// }

weatherReport = function(city){
  // console.log()
  this.http.get('https://api.weatherbit.io/v2.0/current?city='+city+'&key=231efb616af04cff81449767b7e8e4e6').subscribe(res => {
    // console.log(this.weatherResponse);
    console.log(res);
    if(res && res.data){
      console.log(res.data[0]);
      this.weatherResponse = res.data[0];
    }else{
      alert('Enter correct city');
    }
  }, err => {
    console.log(err);
    alert('Something went wrong. Please try again!');
  })
}

}
