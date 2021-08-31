export class Color {
  private constructor(readonly rgb: string) {}

  static from(rgb: string): Color {
    if (/^#[a-f0-9]{6}$/i.test(rgb)) {
      throw new Error('');
    }

    return new Color(rgb.toUpperCase());
  }
}
