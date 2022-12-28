import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { getArticles, deleteArticleFromDb } from "../../APIS/apis";
import ArticleTable from "./articleTable";
import Spinner from "../Common/Spinner";
import { Link } from "react-router-dom";
import Pagination from "../Common/Pagination";

const Articles = () => {
  const [data, setData] = useState({
    loading: true,
    articles: [],
    pageOfArticles: [],
  });

  useEffect(() => {
    getData()
      .then((res) => {
        setData({ ...data, loading: false, articles: res });
      })
      .catch((err) => {
        setData({ ...data, loading: false });
        alert(err.message);
      });
  }, []);

  const getData = async () => {
    return await getArticles();
  };

  const deleteArticleHandler = async (id, image) => {
    const confirm = window.confirm("Are you sure, you want to delete it?");
    if (!confirm) return;

    try {
      setData({ ...data, loading: true });
      let allarticles = [...data.articles];
      allarticles = allarticles.filter((itm) => itm._id !== id);
      await deleteArticleFromDb(id, image);
      setData({
        ...data,
        loading: false,
        articles: allarticles,
      });
    } catch (error) {
      setData({ ...data, loading: false });
      alert(error.message);
    }
  };

  const onChangePage = (pageOfItems) => {
    setData({ ...data, pageOfArticles: pageOfItems });
  };

  return (
    <Sidebar>
      {data.loading ? (
        <Spinner />
      ) : (
        <div
          onScroll={() => {
            console.log("Scrolled");
          }}
        >
          <h2>Articles Data</h2>
          <Link
            className="btn btn-outline-primary btn-block"
            to={"/articles/add"}
            state={{ article: null }}
          >
            Create Article
          </Link>

          <ArticleTable
            data={data.pageOfArticles}
            deleteArticle={deleteArticleHandler}
          />
          <Pagination items={data.articles} onChangePage={onChangePage} />
        </div>
      )}
    </Sidebar>
  );
};

export default Articles;
