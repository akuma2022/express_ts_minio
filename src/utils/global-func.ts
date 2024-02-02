export function stringToSlug(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ""); // Trim whitespace from the beginning and end of the string
  str = str.toLowerCase();

  // Remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid characters
    .replace(/\s+/g, "-") // Collapse whitespace and replace by -
    .replace(/-+/g, "-"); // Collapse dashes

  return str;
}

export function removeAscent(str: any) {
  if (str === null || str === undefined) return str;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\s+/g, "");
  return str;
}

export function fileNameToSlug(fileName: string): string {
  const nameParts = fileName.split("."); // Tách phần tên và phần mở rộng của tệp

  // Chuyển phần tên thành slug
  const nameSlug = nameParts[0]
    .toLowerCase()
    .replace(/[^\w ]+/g, "") // Loại bỏ các ký tự không phải là chữ cái, số, hoặc khoảng trắng
    .replace(/ +/g, "-"); // Thay thế khoảng trắng bằng dấu gạch ngang

  // Kết hợp lại với phần mở rộng
  const extension =
    nameParts.length > 1 ? `.${nameParts.slice(1).join(".")}` : "";
  return `${nameSlug}${extension}`;
}
