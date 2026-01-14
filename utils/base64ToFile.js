export default (base64, filename = "file.jpg") => {
  const arr = base64.split(",");
  const b64 = arr.length > 1 ? arr[1] : arr[0];
  const mime = "image/jpg";
  const bstr = atob(b64);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};
