import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ConsolePage } from "./pages/console/ConsolePage";
import { Card, Layout, Menu } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { BackupPage } from "./pages/BackupPage";
import { PassportPage } from "./pages/PassportPage";

const { Header, Content, Footer } = Layout;

const paths = {
  consolePage: "/console",
  backupPage: "/backup",
};

export const Main = () => {
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[location.pathname]}
        >
          <Menu.Item key={paths.consolePage}>
            控制台
            <Link to={paths.consolePage} />
          </Menu.Item>
          <Menu.Item key={paths.backupPage}>
            备份恢复
            <Link to={paths.backupPage} />
          </Menu.Item>
        </Menu>
      </Header>
      <Content className="content">
        <div className="site-layout-content">
          <PassportPage />
          <Switch>
            <Route path={paths.consolePage}>
              <ConsolePage />
            </Route>
            <Route path={paths.backupPage}>
              <BackupPage />
            </Route>
            <Route>
              <Redirect to={paths.consolePage} />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Minecraft Server Management System - 崽崽养殖场
      </Footer>
    </Layout>
  );
};

export const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};
