import { Component, OnInit } from '@angular/core';
import { Unsubscribable } from 'rxjs';

import {
  faGithub,
  faTwitter,
  faLinkedin,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons';

import {
  BLACK,
  WHITE,
  Color,
  luminanceFrom,
  meanColor
} from '../utilities/colors';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  links = [
    {
      url: 'https://guigui64.github.com/',
      icon: faGlobe
    },
    {
      url: 'https://github.com/guigui64',
      icon: faGithub
    },
    {
      url: 'https://www.twitter.com/guillaumecomte',
      icon: faTwitter
    },
    {
      url: 'https://www.linkedin.com/in/guillaumecomtep/',
      icon: faLinkedin
    },
    {
      url: 'https://www.facebook.com/guillaume.comtep',
      icon: faFacebook
    },
    {
      url: 'mailto:guillaume.comte10@gmail.com',
      icon: faEnvelope
    }
  ];

  footerStyles = {};

  private _subscription: Unsubscribable;

  constructor(private colorsService: ColorsService) {}

  ngOnInit() {
    this._subscription = this.colorsService.colors$.subscribe(
      (colors: Color[]) => {
        this.updateStyles(luminanceFrom(meanColor(colors)) < 0.5);
      },
      error => console.error('Impossible to subscribe to colors service', error)
    );
    this.updateStyles(
      luminanceFrom(meanColor(this.colorsService.getColors())) < 0.5
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  updateStyles(isDark: boolean): void {
    this.footerStyles['background-color'] = `${(isDark
      ? BLACK
      : WHITE
    ).toRGBAString(0.5)}`;
  }
}
