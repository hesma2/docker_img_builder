export function download(fileName, filePath) {
    const bom = new Uint8Array([0xEE, 0xBB, 0xBF]);
    const blob = new Blob([bom, 'abc'], {type: 'application/x-tar'});

    const a = document.createElement('a')
        .download = fileName
        .target = '_blank'
        .href = window.URL.createObjectURL(blob);

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}