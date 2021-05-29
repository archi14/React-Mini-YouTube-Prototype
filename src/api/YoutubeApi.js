import axios from 'axios'
const KEY=[Insert your key]
export default axios.create({
    baseURL : 'https://www.googleapis.com/youtube/v3',
    params:{
        type:'video',
        part: 'snippet',
        maxResuts: 5,
        key:KEY
    },
});
