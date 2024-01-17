export const toEnglishDigits = (str: string) => {
  const pn = "۰۱۲۳۴۵۶۷۸۹";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const an = "٠١٢٣٤٥٦٧٨٩";

  if (/[۰-۹]/g.test(str)) {
    console.log("Hell");
    return str.replace(/[۰-۹]/g, (d) => pn.indexOf(d).toString());
  }

  return str;
};
