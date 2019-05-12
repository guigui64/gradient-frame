export class Color {
  private _red = 0;
  private _green = 0;
  private _blue = 0;

  constructor(red: number = 0, green: number = 0, blue: number = 0) {
    this._red = red;
    this._green = green;
    this._blue = blue;
  }

  get red(): number {
    return Math.min(255, Math.max(0, this._red));
  }

  get green(): number {
    return Math.min(255, Math.max(0, this._green));
  }

  get blue(): number {
    return Math.min(255, Math.max(0, this._blue));
  }

  toRGBAString(alpha: number = 1.0): string {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
  }
}

export function meanColor(color1: Color, color2: Color): Color {
  return new Color(
    (color1.red + color2.red) / 2,
    (color1.green + color2.green) / 2,
    (color1.blue + color2.blue) / 2);
}

export function inverseColor(color: Color): Color {
  return new Color(255 - color.red, 255 - color.green, 255 - color.blue);
}

export function luminanceFrom(color: Color): number {
  return (.299 * color.red + .587 * color.green + .114 * color.blue) / 255.;
}

export const BLACK = new Color(0, 0, 0);
export const WHITE = new Color(255, 255, 255);

export const DEFAULT_COLOR_1 = new Color(226, 0, 255);
export const DEFAULT_COLOR_2 = new Color(0, 243, 255);

/**
 * Returns a Color
 * @param hexa a string with format '#rrggbb'
 */
export function parseHexa(hexa: string): Color {
  const hred = hexa.slice(1, 3);
  const hgreen = hexa.slice(3, 5);
  const hblue = hexa.slice(5, 7);
  return new Color(
    parseInt(hred, 16),
    parseInt(hgreen, 16),
    parseInt(hblue, 16));
}
