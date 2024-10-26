import { ITime } from '@app-types/ITime.ts';
import {
  MILLISECONDS_REPLACE_STRING,
  MINUTES_REPLACE_STRING,
  SECONDS_REPLACE_STRING,
} from '@utils/time/constants.ts';

export const timeToString = (
  time: ITime,
  format: string,
  separateString: string = ':',
): string | null => {
  const parts = format.split(separateString);
  parts.forEach(part => {
    if (
      !part.includes(MILLISECONDS_REPLACE_STRING) &&
      !part.includes(SECONDS_REPLACE_STRING) &&
      !part.includes(MINUTES_REPLACE_STRING)
    ) {
      console.error(
        `All parts of format must have replace string from list: "${MILLISECONDS_REPLACE_STRING}", "${SECONDS_REPLACE_STRING}", "${MINUTES_REPLACE_STRING}"`,
      );
      return null;
    }
  });
  const newParts: string[] = [];
  parts.forEach(part => {
    newParts.push(handleReplacePart(part, time));
  });

  let result: string = '';
  newParts.forEach((newPart, i) => {
    if (i !== newParts.length - 1) result += newPart + separateString;
    else result += newPart;
  });

  return result;
};

const handleReplacePart = (part: string, time: ITime) => {
  let value: string;
  let replaceString: string;
  let replaceCount = 0;

  if (part.includes(MILLISECONDS_REPLACE_STRING)) {
    value = time.milliseconds.toString();
    replaceString = MILLISECONDS_REPLACE_STRING;
  } else if (part.includes(SECONDS_REPLACE_STRING)) {
    value = time.seconds.toString();
    replaceString = SECONDS_REPLACE_STRING;
  } else if (part.includes(MINUTES_REPLACE_STRING)) {
    value = time.minutes.toString();
    replaceString = MINUTES_REPLACE_STRING;
  } else {
    console.warn(`Part ${part} not contains replace strings`);
    return part;
  }

  for (let i = 0; i < part.length; i++) {
    if (i <= part.length - replaceString.length) {
      const substring = part.substring(i, i + replaceString.length);
      if (substring === replaceString) replaceCount += 1;
    }
  }
  if (value.length < replaceCount) {
    for (let i = 0; i < replaceCount - value.length; i++) {
      value = '0' + value;
    }
  } else if (value.length > replaceCount) {
    value = value.substring(value.length - replaceCount);
  }

  let i = 0;
  let result = '';
  let valueIndex = 0;
  while (i < part.length) {
    if (i <= part.length - replaceString.length) {
      const substring = part.substring(i, i + replaceString.length);
      if (substring === replaceString && valueIndex < value.length) {
        result += value[valueIndex];
        valueIndex += 1;
        i += replaceString.length;
      } else {
        result += part[i];
        i += 1;
      }
    } else {
      result += part[i];
      i += 1;
    }
  }
  return result;
};
