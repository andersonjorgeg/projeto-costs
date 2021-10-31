import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import pages
import Home from './components/pages/Home/Home'
import Contact from './components/pages/Contact/Contact'
import Company from './components/pages/Company/Company'
import NewProject from './components/pages/NewProject/NewProject'
import Projects from './components/pages/Projetos/Projects'
import Project from './components/pages/Projeto/Project'

//import layout
import Container from './components/layout/Containeer/Container'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Container customClass="min-height">
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/company">
            <Company />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/newproject">
            <NewProject />
          </Route>
          <Route path="/project/:id">
            <Project />
          </Route>
        </Container>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
