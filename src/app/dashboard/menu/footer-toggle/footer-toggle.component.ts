import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'footer-toggle',
  templateUrl: './footer-toggle.component.html',
  styleUrls: ['./footer-toggle.component.css']
})
export class FooterToggleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeLogo(logo) {
    if (logo == 'fb') {
      (<HTMLElement>document.querySelector('.switch-ios.switch-toggle a')).style.backgroundImage = "url(../../../assets/img/logos/Facebook.svg)";
        // document.querySelector('.switch-ios.switch-toggle').style.backgroundColor = "#cccccc";
        $('#logo').addClass('spinFb');
        setTimeout(function () {
            $('#logo').removeClass('spinFb');
        }, 400);
    } else if (logo == 'ig') {
      (<HTMLElement>document.querySelector('.switch-ios.switch-toggle a')).style.backgroundImage =
            "url(../../../assets/img/logos/Instagram.svg)";
        // document.querySelector('.switch-ios.switch-toggle').style.backgroundColor = "#cccccc";
        $('#logo').addClass('spinFb');
        setTimeout(function () {
            $('#logo').removeClass('spinFb');
        }, 400);
    } else if (logo == 'tw') {
      (<HTMLElement>document.querySelector('.switch-ios.switch-toggle a')).style.backgroundImage = "url(../../../assets/img/logos/Twitter.svg)";
        //    document.querySelector('.switch-ios.switch-toggle').style.backgroundColor = "#cccccc";
        $('#logo').addClass('spinFb');
        setTimeout(function () {
            $('#logo').removeClass('spinFb');
        }, 400);
    } else {
      (<HTMLElement>document.querySelector('.switch-ios.switch-toggle a')).style.backgroundImage = "url(../../../assets/img/logos/Zt-01.svg)";
        //   document.querySelector('.switch-ios.switch-toggle').style.backgroundColor = "#cccccc";
        $('#logo').addClass('spinFb');
        setTimeout(function () {
            $('#logo').removeClass('spinFb');
        }, 400);
    }
  }

}
