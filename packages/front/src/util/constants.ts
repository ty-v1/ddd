import { DateTimeFormatter } from '@js-joda/core';

export const DefaultDateTimeFormatter = DateTimeFormatter.ofPattern('yyyy/MM/dd HH:mm:ss');

export const DefaultDateFormatter = DateTimeFormatter.ofPattern('yyyy/MM/dd');

export const ApiResponseDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.S'Z'");

export const ApiResponseDateFormatter = DateTimeFormatter.ofPattern('yyyy-MM-dd');
