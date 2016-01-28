export default function getHostName(url) {
    let a = document.createElement('a');
    a.href = url;
    return a.hostname;
}