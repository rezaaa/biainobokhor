const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];

export const arrayNormalizer = ({
  data,
  prop,
  page = 1,
  list = {},
  hash = [],
  paginatedHash = {},
}) => {
  const transformedList = (data || []).map((item) => {
    const resultId = item[prop];
    list[resultId] = item;
    return resultId;
  });

  paginatedHash[page] = data?.map((item) => item.id);

  return {
    hash: hash.concat(
      transformedList?.filter((item) => hash.indexOf(item) < 0)
    ),
    list,
    paginatedHash,
  };
};

export const farsiNumber = (value) => {
  if (!value && value !== 0) {
    return;
  }
  value = value.toString();
  for (var i = 0, numbersLen = englishNumbers.length; i < numbersLen; i++) {
    value = value.replace(
      new RegExp(englishNumbers[i], "g"),
      persianNumbers[i]
    );
  }
  return value;
};

export function englishNumber(value) {
  if (!value && value !== 0) {
    return;
  }
  value = value.toString();
  for (var i = 0; i < persianNumbers.length; i++) {
    value = value.replace(
      new RegExp(persianNumbers[i], 'g'),
      englishNumbers[i]
    );
  }
  return value;
}

export function convertToSeperatedFarsiPrice(value) {
  let englishRawPresentation = convertToRawEnglishNumber(value);
  if (!englishRawPresentation && englishRawPresentation !== 0) {
    englishRawPresentation = 0;
  }
  const farsiNumberWithCommas = numberWithCommas(englishRawPresentation);
  const faNumber = farsiNumber(farsiNumberWithCommas);
  if (!faNumber && faNumber !== 0) {
    return;
  }
  return faNumber;
}

export function convertToUnseperatedFarsiNumber(value) {
  let englishRawPresentation = convertToRawEnglishNumber(value);
  if (!englishRawPresentation && englishRawPresentation !== 0) {
    englishRawPresentation = 0;
  }
  const faNumber = farsiNumber(englishRawPresentation);
  if (!faNumber && faNumber !== 0) {
    return;
  }
  return faNumber;
}

export function extractRawNumber(value) {
  if (!value && value !== 0) {
    return;
  }
  return value.toString().replace(/[^0-9\.]/g, '');
}

export function convertToRawEnglishNumber(value) {
  const enNumber = englishNumber(value);
  if (!enNumber && enNumber !== 0) {
    return;
  }
  const englishNumberWithoutCommas = extractRawNumber(enNumber);
  const parsedValue = parseInt(englishNumberWithoutCommas);
  return parsedValue ? parsedValue : 0;
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٫');
}

export const getUserAgent = () => {
  const userAgent = navigator.userAgent;
  const isAndroid = () => Boolean(userAgent.match(/Android/i));
  const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
  const isOpera = () => Boolean(userAgent.match(/Opera Mini/i));
  const isWindows = () => Boolean(userAgent.match(/IEMobile/i));
  const isSSR = () => Boolean(userAgent.match(/SSR/i));
  const isMobile = () =>
    Boolean(isAndroid() || isIos() || isOpera() || isWindows());
  const isDesktop = () => Boolean(!isMobile());
  return {
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isSSR,
  };
};