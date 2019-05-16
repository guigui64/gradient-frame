import { Component, OnInit } from '@angular/core';
import { Unsubscribable } from 'rxjs';

import { faGithub, faTwitter, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';

import { BLACK, WHITE, Color, luminanceFrom, meanColor } from '../utilities/colors';
import { ColorsService } from '../colors.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faGithub = faGithub;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faFacebook = faFacebook;
  faEnvelope = faEnvelope;
  faHome = faHome;

  footerStyles = {
    "box-shadow": `3px 0 5px ${BLACK.toRGBAString(.3)}`,
  };

  private _subscription: Unsubscribable;

  constructor(private colorsService: ColorsService) { }

  ngOnInit() {
    this._subscription = this.colorsService.colors$.subscribe(
      (colors: Color[]) => {
        this.updateStyles(luminanceFrom(meanColor(colors)) < .5);
      },
      (error) => console.error('Impossible to subscribe to colors service', error));
    this.updateStyles(luminanceFrom(meanColor(this.colorsService.getColors())) < .5);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  updateStyles(isDark: boolean): void {
    this.footerStyles["background-color"] = `${(isDark ? BLACK : WHITE).toRGBAString(.5)}`;
  }

}
