import { Inter } from "next/font/google";
import { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Header, Icon, List } from "semantic-ui-react";
import LoginPage from "@/component/LoginPage";
import SectionFilter from "@/component/SectionFilter";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [filterValue, setFilterValue] = useState("all");
  const filterChanged = (value: string) => {
    setFilterValue(value);
  };

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
