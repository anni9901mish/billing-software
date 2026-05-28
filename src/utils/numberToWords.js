export const numberToWords = (num) => {
  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convertLessThanThousand = (n) => {
    let str = "";

    if (n >= 100) {
      str +=
        ones[Math.floor(n / 100)] +
        " Hundred ";

      n %= 100;
    }

    if (n >= 20) {
      str +=
        tens[Math.floor(n / 10)] + " ";

      n %= 10;
    }

    if (n > 0) {
      str += ones[n] + " ";
    }

    return str.trim();
  };

  if (num === 0) return "Zero";

  let result = "";

  if (Math.floor(num / 100000) > 0) {
    result +=
      convertLessThanThousand(
        Math.floor(num / 100000)
      ) + " Lakh ";

    num %= 100000;
  }

  if (Math.floor(num / 1000) > 0) {
    result +=
      convertLessThanThousand(
        Math.floor(num / 1000)
      ) + " Thousand ";

    num %= 1000;
  }

  if (num > 0) {
    result += convertLessThanThousand(num);
  }

  return result.trim();
};