import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'maplibre-gl';

@Component({
  selector: 'app-full-screen-page',
  templateUrl: './full-screen-page.component.html',
  styleUrl: './full-screen-page.component.css',
})
export class FullScreenPageComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {

    var map = new Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
