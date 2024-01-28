import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const Home = ({ isAuth }) => {
  const [postList, setPostList] = useState([]);

  // const deletePost = async (id) => await deleteDoc(doc(db, "posts", id));

  const deletePost = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, "posts", id))
    } catch (error) {
      console.log('Error Deleting Post:', error);
    }
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(collection(db, "posts"));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, [deletePost]);

  return (
    <div className="homePage">
      {postList.map((post) => (
        <div className="post" key={post.id}>
          <div className="postHeader">
            <div className="title">
              <h1>{post.title}</h1>
            </div>
            <div className="deletePost">
              {/* Only Show button If post id === current user ID */}
              {/* Also isAuth is true */}
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button onClick={() => deletePost(post.id)}> &#128465; </button>
              )}
            </div>
          </div>
          <div className="postTextContainer">
            {post.postText}
            <h3>@ {post.author.name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
