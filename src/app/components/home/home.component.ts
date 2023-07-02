import { Component } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { DatePipe } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { List } from 'src/app/models/forcast.model';
import { weather } from 'src/app/models/weather.model';
import { location } from 'src/app/models/location.model';
import { Data } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  input!: string;
  debounce = new Subject<string>();
  search = false;
  current!: weather;
  location!: location;
  forcast!: List[];
  todaysForcast!: List[];
  weaklyForcast!: List[];
  date = new Date();

  constructor(private weather: WeatherService, public datePipe: DatePipe) {
    this.debounce
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => {
        this.locationfun(value);
      });
  }

  locationfun(input: string) {
    this.search = true;
    this.weather.getLocation(input).subscribe({
      next: (res) => {
        return (this.location = res);
      },
      error: (err) => {
        console.log(err.error);
      },
    });
  }

  weatherfun(latLon: any) {
    this.input = latLon.name;
    this.search = false;
    let lat = latLon.latitude;
    let lon = latLon.longitude;
    this.weather.getCurrent(lat, lon).subscribe((res) => {
      this.current = res;
    });

    this.forcastfun(lat, lon);
  }
  forcastfun(lat: any, lon: any) {
    this.weather.getForcast(lat, lon).subscribe((res) => {
      this.todaysForcast = res.filter((val) => {
        let dat = this.datePipe.transform(val.dt_txt, 'yyyy/MM/dd');
        let formatdate = this.datePipe.transform(this.date, 'yyyy/MM/dd');

        return dat == formatdate;
      });
      this.weaklyForcast = res.filter((val) => {
        let dat = this.datePipe.transform(val.dt_txt, 'HH');
        return dat == '12';
      });
      console.log(this.todaysForcast, this.weaklyForcast);

      this.forcast = res;
      console.log(this.forcast);
    });
  }

  currentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.weatherfun(pos.coords);
        },
        (err) => {
          alert(err.message);
        }
      );
    } else {
      alert('Geolocation is not available on your browser or device');
    }
  }
}
