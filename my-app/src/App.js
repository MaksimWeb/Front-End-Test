import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import WorkersContainer from "./components/Workers/WorkersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import AddWorkerContainer from "./components/AddWorker/AddWorkerContainer"
import { useField, Form, FormikProps, Formik } from 'formik';

function App(props) {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Header/>
                <div className="app-content">
                    <Navbar/>
                    <Route path={'/workers'} render={() => <WorkersContainer/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer/>}/>
                    <Route path={'/adduser'} render={() => <AddWorkerContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
