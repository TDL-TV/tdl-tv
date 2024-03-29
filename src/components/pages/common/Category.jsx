import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import ContentBox from "../common/ContentBox";
import { useParams } from "react-router-dom";
import { useLoadingContext } from "react-router-loading";

const Category = () => {
  const loadingContext = useLoadingContext();
  const [allPhotos, setAllPhotos] = useState([]);
  const photosCollectionRef = collection(db, "posts");

  let { category } = useParams();

  const sortAllPhotos = query(
    photosCollectionRef,
    where("category", "==", category)
  );

  useEffect(() => {
    loadingContext.start();

    const getAllPhotos = async () => {
      const photoData = await getDocs(sortAllPhotos);
      setAllPhotos(
        photoData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      loadingContext.done();
    };
    getAllPhotos();
  }, []);

  console.log(allPhotos);

  return (
    <div className="content">
      <div className="content_container">
        <>
          {allPhotos.map((post) => {
            return (
              <>
                <ContentBox
                  title={post.title}
                  category={post.category}
                  description={post.description}
                  author={post.username}
                  image={post.image}
                  date={post.date}
                />
              </>
            );
          })}
        </>
      </div>
    </div>
  );
};

export default Category;
