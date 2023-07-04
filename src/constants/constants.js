

export const domain = window.location.href.includes('localhost') ?  'http://localhost:5000' : window.location.host

console.log(`DOMAIN :: ${domain}`)

