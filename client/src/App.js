import PostCreate from './PostCreate';
import PostList from './PostList';
import CommentCreate from './CommentCreate';

function App() {
    return (
        <div className="App">
            <PostCreate />
            <PostList />
            <CommentCreate />
        </div>
    );
}

export default App;
