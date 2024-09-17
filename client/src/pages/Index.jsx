import "../init";
import "../App.css";
import { Footer, Navbar, Services, Transactions, Welcome } from "../components";
import YTKExchange from "../components/YTKExchange";
import Container from "../components/Container";

function Index() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Container>
        <Navbar />
        <Welcome />
        </Container>
      </div>
      <Services />
      <YTKExchange />
      <Transactions />
      <Footer />
    </div>
  );
}

export default Index;
