import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { createApiClient } from "./api/apiClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { Button, Header, Icon, List } from "semantic-ui-react";
import LoginPage from "@/component/LoginPage";
import SectionFilter from "@/component/SectionFilter";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [filterValue, setFilterValue] = useState("all");
  const filterChanged = (value: string) => {
    setFilterValue(value);
  };
  /*  const apiClient = createApiClient();
  const [dataSources, setDataSources] = useState<any>([]);
  useEffect(() => {
    createApiClient();
     const fetch = async () => {
      const dataSources = await apiClient.getDataSources();
      setDataSources(dataSources);
    };
    fetch();
  }, []); */
  return (
    <div className="home-body">
      <div className="home-header-container">
        <Header
          className="home-header"
          as="h1"
          icon
          textAlign="center"
          color="blue"
        >
          <Icon name="stopwatch" />
          <Header.Content>Welcome to Activity Counter</Header.Content>
        </Header>
      </div>
      <div className="home-filter">
        <SectionFilter filterChanged={filterChanged} />
      </div>

      <LoginPage filterValue={filterValue} />

      <footer className="home-footer">
        <List horizontal>
          <List.Item>
            <List.Content>
              <List.Header>Simon.H</List.Header>
            </List.Content>
          </List.Item>
        </List>
      </footer>
    </div>
  );
}
