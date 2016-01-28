var api = {
    'index': 'https://hacker-news.firebaseio.com/v0/topstories',
    'new': 'https://hacker-news.firebaseio.com/v0/newstories',
    'show': 'https://hacker-news.firebaseio.com/v0/showstories',
    'ask': 'https://hacker-news.firebaseio.com/v0/askstories',
    'jobs': 'https://hacker-news.firebaseio.com/v0/jobstories',
    'item': 'https://hacker-news.firebaseio.com/v0/item/'
};

var categories = ['index', 'new', 'show', 'ask', 'jobs'];

var customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: 100
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        height: '100%',
        width: '100%',
        marginRight: '-50%',
        WebkitTransform: 'translate(-50%, -50%)',
        msTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 101,
        overflow: 'auto'
    }
};

export { api, categories, customStyles };