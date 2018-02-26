let THREADS = [
    {eventId: 0, title: 'homework', username: 'David', date: 1, text: 'I need help doing Math homework.'},
    {eventId: 1, title: 'play football', username: 'Maria', date: 8, text: 'I am looking for a person who wants to play football'},
    {eventId: 2, title: 'homework', username: 'George', date: 11, text: 'I need help doing Science homework'},
    {eventId: 3, title: 'exercise', username: 'Obama', date: 18, text: 'Does anyone want to exercise with me?'},
    {eventId: 4, title: 'game', username: 'Yoon', date: 18, text: 'Who wants to play league of legend'},
    {eventId: 5, title: 'basketball', username: 'Michael', date: 21, text: 'basketball basketball basketball' },
]
class ForumDB {
    static getThreads(){
        return THREADS;
    }
    static readThread(eventId){
        return THREADS[eventId]
    }
    static writeThread(title,username,text,date,callback){
        let newThreads = {
            eventId:ForumDB.getEventId(),
            title:title,
            username:username,
            text:text,
            date:date
        };
        THREADS.push(newThreads);
        callback;
    }
    static getEventId(){
        return THREADS.length
    }
    
}

export default ForumDB;