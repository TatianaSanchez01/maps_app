import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { LngLat, Map } from 'maplibre-gl';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  constructor() {}

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';
    this.map = new Map({
      container: this.divMap.nativeElement,
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom,
    });

    this.mapListeners();
  }
  ngOnDestroy(): void {
    this.map?.remove()
  }

  mapListeners() {
    if (!this.map) throw Error('Mapa no inicializado');

    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (e) => {
      if (this.map!.getZoom() < 18) return;

      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();

    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
