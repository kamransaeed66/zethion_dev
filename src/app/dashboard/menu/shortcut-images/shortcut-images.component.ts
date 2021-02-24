import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/_service/data/data.service';
import { NewsSectionComponent } from '../../news-section/news-section.component';
declare var $: any;

@Component({
  selector: 'app-shortcut-images',
  templateUrl: './shortcut-images.component.html',
  styleUrls: ['./shortcut-images.component.css']
})
export class ShortcutImagesComponent implements OnInit {
  @Input()
  currShortcuts: object[] = [];
  @Input()
  shortcutImages: object[] = [];
  curr: any;
  loader: boolean = false;
  constructor(
    private comp:NewsSectionComponent,
    protected data: DataService) { }

  ngOnInit(): void {
    $("#scrollable").bind("mousewheel",function(ev, delta) {
      var scrollLeft = $(this).scrollLeft();
      $(this).scrollLeft(scrollLeft-Math.round(delta*30));
    });

    this.data.getLoader().subscribe(loader => {
      this.loader = loader;
      if(this.loader === false){
        this.curr = '';
      }
    });

  }

  shortcutClick(ele) {
    this.curr = ele.id;
    this.data.changeLoader(true);
    this.comp.getfilterNews(0, 20, ele.keyword, '');
  }

}
