export default function getCustomDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString();
}