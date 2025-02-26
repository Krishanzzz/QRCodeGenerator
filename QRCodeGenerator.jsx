import "../CSSFiles/QRCodeGenerator.css";
import {useState} from "react";
export function QRCodeGenerator () {
    const [img, setImg] = useState("src/assets/defaultqr.png");
    const [load, setLoad] = useState(false);
    const [qrData, setQrData] = useState("please upload url");
    const [size, setSize] = useState("150");

    async function generateQRCode () {
        setLoad(true);
        try{
            const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}`;
            setImg(url);
        }catch(err){
            console.log(err);
        }finally {
            setLoad(false);
        }
    }
    function downloadQRCode () {
        fetch(img)
            .then((res) => res.blob())
            .then((blob) => {
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "QRCode.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(err => console.log(err));
    }
    return(
        <div className="app-container">
            <h1 className="Heading">QR Code Generator</h1>
            {load && <p>Please Wait...</p>}
            {img && <img src={img} alt="QR Code Generator" className="image"/>}
            <label htmlFor="url" className="input-label">Enter the URL</label>
            <input type="text" id="url" placeholder="Enter the URL to generate QR Code" onChange={(e) => setQrData(e.target.value)} />
            <label htmlFor="size" className="input-label">Enter the size</label>
            <input type="text" id="size" placeholder="Enter the size to generate QR Code" onChange={(e) => setSize(e.target.value)} />
            <div className="btn-container">
            <button className="crt-btn" onClick={generateQRCode} disabled={load}>Create QR Code</button>
            <button className="dwnl-btn" onClick={downloadQRCode}>Download QR Code</button>
            </div>
        </div>
    )
}