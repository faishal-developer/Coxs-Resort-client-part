import { BrowserRouter,Switch,Route } from 'react-router-dom';
import AddNewService from './component/addNewService/AddNewService';
import Banner from './component/banner/Banner';
import Footer from './component/footer/Footer';
import Galaries from './component/galaries/Galaries';
import Header from './component/header/header';
import AuthContext from './component/hooks/ContextApi';
import PrivateRoute from './component/hooks/PrivateRoute';
import Login from './component/login/Login';
import ManageAllOrders from './component/manageAllOrders/ManageAllOrders';
import MyOrders from './component/myorders/MyOrders';
import PlaceOrder from './component/placeOrder/PlaceOrder';
import Register from './component/register/Register';
import Rooms from './component/rooms/rooms';

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
      <Header/>
        <Switch>
          <Route exact path='/'>
            <Banner/>
            <Rooms/>
            <Galaries/>
          </Route>
          <Route path='/home'>
            <Banner/>
            <Rooms/>
            <Galaries/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/rooms'>
            <Rooms/>
          </Route>
          <Route path='/galarie'>
            <Galaries/>
          </Route>
          <PrivateRoute path='/addnewservice'>
            <AddNewService/>
          </PrivateRoute>
          <PrivateRoute path='/manageAllOrders'>
            <ManageAllOrders/>
          </PrivateRoute>
          <PrivateRoute path='/myorder'>
            <MyOrders/>
          </PrivateRoute>
          <PrivateRoute path='/placeorder/:orderId'>
            <PlaceOrder/>
          </PrivateRoute>
        </Switch>
        <Footer/>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
