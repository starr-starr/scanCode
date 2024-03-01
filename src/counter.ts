import { scan } from 'qr-scanner-wechat'

const scannedQRCodeInfo:any = []; // 存储扫描到的所有二维码信息

export function scanner(input:HTMLInputElement,img:HTMLImageElement,container:HTMLDivElement,dot:HTMLDivElement) {
  input!.addEventListener('change',async (e:Event)=>{
    const fileElement = (e.target as HTMLInputElement)
    if(!fileElement.files?.length) return
    const file = fileElement.files[0]
    const value = URL.createObjectURL(file)
    img!.src = value
    img.addEventListener('load', async () => {
      await coverQRCode(img, container,dot);
  })
})
}

async function coverQRCode(img: HTMLImageElement, container: HTMLDivElement,dot:HTMLDivElement) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, img.width, img.height);

  let continueScanning = true;

  while (continueScanning) {
      const res = await scan(canvas) as any
      if (!res.text) {
          continueScanning = false;
          break;
      }

      console.log(res);
      scannedQRCodeInfo.push(res);
      const { x, y, width, height } = res.rect;
      ctx!.fillStyle = 'black';
      ctx?.fillRect(x, y, width, height);

      // Display each found QR code
      const codeCanvas = document.createElement('canvas');
      codeCanvas.width = width;
      codeCanvas.height = height;
      const codeCtx = codeCanvas.getContext('2d');
      codeCtx?.drawImage(canvas, x, y, width, height, 0, 0, width, height);
      container.appendChild(codeCanvas);
  }

  draw(dot)
}

function draw(container:HTMLDivElement) {
  scannedQRCodeInfo.forEach(({rect, text}:any) => {
  const dom = document.createElement("div");
  const { x, y, width, height } = rect;
  const _x = (x || 0) + width / 2 - 20;
  const _y = (y || 0) + height / 2 - 20;
  dom.style.width = "40px";
  dom.style.height = "40px";
  dom.style.background = "green";
  dom.style.position = "absolute";
  dom.style.zIndex = "9";
  dom.style.top = _y + "px";
  dom.style.left = _x + "px";
  dom.style.color = "#fff";
  dom.style.textAlign = "center";
  dom.style.borderRadius = "100px";
  dom.style.borderBlockColor = "#fff";
  dom.style.borderColor = "unset";
  dom.style.borderRightStyle = "solid";
  dom.style.borderWidth = "3px";
  dom.addEventListener("click", () => {
    console.log(text);
  });
  container.appendChild(dom);
});
}
