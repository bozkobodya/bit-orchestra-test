import React from 'react';
import Header from "./compounds/components/header/Header";
import classNames from "classnames";
import styles from './App.module.scss';
import {Router} from "./services/router/router";

function App() {
    return (
        <>
            <Header />
            <main className={classNames('container', styles.main)}>
                <Router />
            </main>
        </>
    );
}

export default App;
