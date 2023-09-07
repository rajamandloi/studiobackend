import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Gallery() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getTotal();
    // eslint-disable-next-line
  }, []);

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <section className="section-three">
        <div className="container">
          <div className="gallery">
            {products?.map((p) => (
              <div className="single-img" >
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  data-bs-toggle="modal" data-bs-target="#exampleModal" 
                />
                <div className="single-img-content">
                  <h3>{p.name}</h3>
                </div>
              </div>
             
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
        {products?.map((p) => (
             
                <div className="modal" id="exampleModal" tabIndex="-1"aria-hidden="true">
                  <div className="modal-dialog modal-lg">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        <img src={`/api/v1/product/product-photo/${p._id}`} />
                      </div>
                    </div>
            ))}
      </section>
    </>
  );
}
