import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import WorkersContainer from "./components/Workers/WorkersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";

function App(props) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <div className="app-content">
                    <Navbar/>
                    <Route path={'/workers'} render={() => <WorkersContainer store={props.store}/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer store={props.store}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
