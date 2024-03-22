import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'maplibre-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent {
  @Input() lngLat?: [number, number];
  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit() {
    if (!this.divMap?.nativeElement) throw 'Map Div not found';
    if (!this.lngLat) throw "LngLat can't be null";

    const map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.lngLat,
      zoom: 15,
      interactive: false,
    });

    new Marker().setLngLat(this.lngLat).addTo(map);
  }
}
