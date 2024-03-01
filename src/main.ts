import { scanner } from "./counter"


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<input type="file" accept="image/png" />
<div id='dot' style="position: relative;">
<img src="" alt="a" width='500' height='250' />
</div>
`

scanner(document.querySelector<HTMLInputElement>('input')!,
        document.querySelector<HTMLImageElement>('img')!,
        document.querySelector<HTMLDivElement>('#app')!,
        document.querySelector<HTMLDivElement>('#dot')!,
)
