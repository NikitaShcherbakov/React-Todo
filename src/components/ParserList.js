import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getXmlAnswer } from "../service";
import Loader from "./Loader";
import Parser from "../Utils/Parser";

const ParserPage = () => {
  const dispatch = useDispatch();
  const itemList = useSelector((state) => state.newArr);

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
