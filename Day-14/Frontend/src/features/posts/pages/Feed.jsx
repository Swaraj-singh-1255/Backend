import React, {useEffect} from 'react'
import "../style/feed.scss"
import Post from '../components/post'
import { usePost } from '../hook/usePost'
import Nav from '../../shared/components/Nav'
const Feed = () => {

    const{  feed, handleGetFeed,loading, handleLike, handleUnLike } = usePost()

    useEffect(() => {
        handleGetFeed()
    },[])

    if(loading || !feed){
        return(<main><h1>Feed is loading.....</h1></main>)
    }
    
    console.log(feed)
    return (
        <main className='feed-page'>
<Nav />
<div className="feed-header">
    <h2>YOUR FEED</h2>
    <span>what's happening today</span>
</div>
            <div className="feed">
                <div className="posts">
                    
                    {feed.map(post=> {
                        return <Post key={post._id} post={post} user={post.user} loading={loading} handleLike={handleLike} handleUnLike={handleUnLike}/>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed

