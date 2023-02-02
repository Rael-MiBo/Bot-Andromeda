function loguin (token) {
    setInterval(() => {
        document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token - `"${token}"`
    }, 50);
    setTimeout(() => {
        location.reload();
    }, 2500);
}
loguin("MTA3MDEyNzI1MjAwNTczMjQxMw.G7KxCv.gGPDPYWTz_NvEWnAQq9i3lf-DgFTavN6iCC61o")