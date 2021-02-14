import {
  BrowserRouter,
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { ConsolePage } from "./pages/console/ConsolePage";
import { Layout, Menu, Spin } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import { BackupPage } from "./pages/backup/BackupPage";
import { AuthenticationModal } from "./AuthenticationModal";
import { useRequest } from "ahooks";
import { buildUrl } from "./config/config";

const { Header, Content, Footer } = Layout;

const paths = {
  consolePage: "/console",
  backupPage: "/backup",
};

export const Main = () => {
  const location = useLocation();

  const verifyAuthRequest = useRequest(async () => {
    const result = await fetch(buildUrl("/validate"), {
      credentials: "include",
      mode: "cors",
    });
    const json = await result.json();
    return json?.result === "ok";
  });

  if (verifyAuthRequest.loading) {
    return <Spin />;
  }
  if (!verifyAuthRequest.data) {
    return (
      <AuthenticationModal
        onAuthSuccess={() => {
          verifyAuthRequest.mutate(() => true);
        }}
      />
    );
  }

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
