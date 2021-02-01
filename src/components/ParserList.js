import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "./Loader";

import { url, queryOptions, searchError } from "../constants.js";
import Parser from "../Utils/Parser";

const ParserPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const itemList = useSelector((state) => state.newArr);

  const getXmlAnswer = () => {
    return fetch(url, queryOptions).then((response) => {
      let responseCode = response.status;
      switch (responseCode) {
        case 200:
          setLoading(false);
          return response.text();
        case 404:
          setLoading(false);
          throw searchError;
        default:
          setLoading(false);
          let responseStatus = response.statusText;
          let emptyStatus = "Status text did not come";
          let status = responseStatus || emptyStatus;
          let newError = new Object();
          newError.description = `Something went wrong`;
          newError.status = `StatusText: ${status}`;
          newError.code = `Status: ${responseCode}`;
          newError.url = `Url: ${url}`;
          throw newError;
      }
    });
  };

  useEffect(() => {
    if (itemList.length === 0) {
      getXmlAnswer().then((date) => {
        const parseNode = new Parser()
          .parseFromString(date)
          .children.filter((item) => item.name === "entry");
        const newArr = parseNode.map(({ children }) => {
          let item = {};
          children.map(({ name, value }) => {
            item[name] = value;
          });
          item["timestamp"] = Math.random().toString(36).slice(-5);
          return item;
        });
        dispatch({ type: "PARSER_ITEM", payload: newArr });
      });
    }
  }, []);
  return (
    <div>
      {itemList.length === 0 && <Loader />}
      {itemList.map(({ title, content, timestamp }, index) => {
        return (
          <div className="box-parser" key={index}>
            <div className="content-parser">
              <h2 className="title-parser">{title}</h2>
              <p className="text-parser">{content}</p>
              <div className="box-read-more-parser">
                <Link
                  className="read-more-parser"
                  to={`/parser-page/parser-item/${timestamp}`}>
                  read more
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ParserPage;
