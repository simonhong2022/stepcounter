import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { createApiClient } from "./api/apiClient";
import { useEffect, useState } from "react";
import Link from "next/link";
import "semantic-ui-css/semantic.min.css";
import { Button, Header, Icon, List } from "semantic-ui-react";
import LoginPage from "@/component/loginPage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const apiClient = createApiClient();
  const [dataSources, setDataSources] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      const dataSources = await apiClient.getDataSources();
      setDataSources(dataSources);
    };
    fetch();
  }, []);
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
          <Icon name="clipboard" />
          <Header.Content>Welcome to AutoSurvey</Header.Content>
        </Header>
      </div>

      <LoginPage></LoginPage>

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
