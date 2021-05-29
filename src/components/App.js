import React from 'react';
import SearchBar from './SearchBar';
import YoutubeApi from '../api/YoutubeApi';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import Spinner from './Spinner';

class App extends React.Component{
    state = {videos: [], selectedVideo: null};

    componentDidMount(){
        this.onTermSubmit('Baloons');
    }
    onTermSubmit = async (term)=>{
        const response = await YoutubeApi.get('/search',{
            params:{
                q:term,
            }
        });

        this.setState({videos: response.data.items,
        selectedVideo: response.data.items[0]
        })
    };
    

    onVideoSelect=(video)=>{
        this.setState({selectedVideo:video});
    }
    renderContent(){
        if(!this.state.selectedVideo && this.state.videos.length==0)
        {
            return (
                <Spinner text='Loading Videos'/>
            );
        }
        return (
        <div className="ui grid">
                <div className="row">
                    <div className="eleven wide column">
                    <VideoDetail video={this.state.selectedVideo}/>
                    </div>
                    <div className="five wide column"> 
                    <VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/>
                    </div>
                </div>
        </div>
        );

    }
    render(){
        return (
        <div className='ui container'> 
            <SearchBar onFormSubmit={this.onTermSubmit}/>
            {this.renderContent()}
        </div>
        );
    }
}

export default App;