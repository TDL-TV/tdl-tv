import "../../assets/css/Contentbox.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ContentBox from "../common/ContentBox";
import { useLoadingContext } from "react-router-loading";

const ArticleCategory = () => {
  const loadingContext = useLoadingContext()
  let { category } = useParams();
  const [sortedArticles, setSortedArticles] = useState([]);
  const articleCollectionRef = collection(db, "posts");

  const sortByCategory = query(
    articleCollectionRef,
    where("type", "==", "articles and blog")
  );

  useEffect(() => {
    document.title = (category)
    loadingContext.start()
    const getAllArticles = async () => {
      const articleData = await getDocs(sortByCategory);
      setSortedArticles(
        articleData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done()
    };

    getAllArticles();
  }, []);

  return (
    <div>
      <div className="content">
        <div className="common_container">
          {sortedArticles
            .filter((data) => data.category === category)
            .map((post) => {
              return (
                <>
                  <ContentBox
                    link={post.id}
                    image={post.image}
                    category={post.category}
                    title={post.title}
                    author={post.username}
                    date={post.date}
                  />
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ArticleCategory;
