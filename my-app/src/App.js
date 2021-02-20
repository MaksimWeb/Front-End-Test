import './App.css';
import { Route} from "react-router-dom";
import Header from "./components/Header/Header";
import WorkersContainer from "./components/Workers/WorkersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import AddWorkerContainer from "./components/AddWorker/AddWorkerContainer"
import 'fontsource-roboto';

function App(props) {
    return (
        <div className="app-wrapper">
            <Header/>
            <div className="app-content">
                <Route path={'/workers'} render={() => <WorkersContainer/>}/>
                <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                <Route path={'/adduser'} render={() => <AddWorkerContainer/>}/>
            </div>
        </div>

    );
}

export default App;
