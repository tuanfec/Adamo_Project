import QRCode from "qrcode";
import { useEffect, useState } from "react";

export const QRImage: React.FC<{ value: any }> = ({ value }) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    QRCode.toDataURL(value).then(setImgUrl);
  }, [value]);

  return <img className="h-full p-5" src={imgUrl} alt="QR Code" />;
};
