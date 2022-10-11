import React from "react";
import { Divider } from "antd";
import { Filter } from "./Filter";
import styles from "./FilterArea.module.css";

export const FilterArea: React.FC = () => {
  return (
    <>
      <Filter title="Route Rate" tags={["1 star", "2 star", "3 star", "4 star", "5 star"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Depart City" tags={["Toronto", "Ottawa", "Vancouver", "Montreal"]} />
      <Divider dashed className={styles["filter-divider"]} />
      <Filter title="Travel days" tags={["2 days", "3 days", "4 days", "5 days", "6 days"]} />
      <Divider dashed />
      <Filter
        title="Journey type"
        tags={["Group tour", "free travel", "self driving tour", "high-end customization"]}
      />
      <Divider dashed />
      <Filter title="Departure time" tags={["Christmas", "national day", "Thanksgiving"]} />
    </>
  );
};
