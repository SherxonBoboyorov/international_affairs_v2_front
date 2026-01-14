export default async (base64) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        blob.arrayBuffer().then(resolve).catch(reject);
      }, "image/png");
    };

    img.onerror = () => reject(new Error("Rasmni yuklashda xatolik"));
    img.src = base64;
  });
};
