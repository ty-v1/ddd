import * as core from '@js-joda/core';
import { Locale } from '@js-joda/locale';

declare module '@js-joda/core' {
  export interface DateTimeFormatter {
    withLocale(locale: Locale): DateTimeFormatter;

    locale(): Locale | null;
  }

  export interface DateTimeFormatterBuilder {
    appendText(field: core.ChronoField, styleOrMap: core.TextStyle | Record<string | number, string>): DateTimeFormatterBuilder;

    appendWeekField(field: string, count: number): DateTimeFormatterBuilder;

    appendZoneText(textStyle: core.TextStyle): DateTimeFormatterBuilder;

    appendLocalizedOffset(textStyle: core.TextStyle): DateTimeFormatterBuilder;
  }
}
