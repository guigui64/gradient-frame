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

export function meanColor(colors: Color[]): Color {
  const len = colors.length;
  return new Color(
    colors.reduce((a, c) => a + c.red, 0) / len,
    colors.reduce((a, c) => a + c.green, 0) / len,
    colors.reduce((a, c) => a + c.blue, 0) / len
  );
}

export function inverseColor(color: Color): Color {
  return new Color(255 - color.red, 255 - color.green, 255 - color.blue);
}

export function luminanceFrom(color: Color): number {
  return (0.299 * color.red + 0.587 * color.green + 0.114 * color.blue) / 255;
}

export const BLACK = new Color(0, 0, 0);
export const WHITE = new Color(255, 255, 255);

const themes = [
  [parseHexa('#00b09b'), parseHexa('#96c93d')], // OHHAPPINESS
  [parseHexa('#fc5c7d'), parseHexa('#6a82fb')], // SUBLIME LIGHT
  [parseHexa('#b92b27'), parseHexa('#1565c0')], // EVENING SUNSHINE
  [parseHexa('#8360c3'), parseHexa('#2ebf91')], // KYE MEH
  [parseHexa('#00f260'), parseHexa('#0575e6')], // RAINBOW BLUE
  [parseHexa('#fc466b'), parseHexa('#3f5efb')], // SUBLIME VIVID
  [new Color(247, 200, 109), new Color(63, 77, 130)], // SUN SET
  [new Color(118, 75, 162), new Color(102, 126, 234)], // PLUM PLATE
  [new Color(192, 0, 255), new Color(0, 161, 255)] // FLASHY
];

export const DEFAULT_COLOR_1 = themes[0][0];
export const DEFAULT_COLOR_2 = themes[0][1];

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
    parseInt(hblue, 16)
  );
}
