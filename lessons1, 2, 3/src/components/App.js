import React, { Component } from "react";

import '../styles/App.css';

import { welcome } from './react-create-element';
import { Welcome } from './react-create-class';
import { PureWelcome } from './react-pure-component';
import { FunctionalWelcome } from './react-functional-component';

import ErrorBoundery from '../ErrorBoundery/ErrorBoundary';

import { StartComponent } from '../container/smart.component';

class App extends Component {
    render() {
        return (
            <div>
                <ErrorBoundery>
                    <h1>Hello world!</h1>
                    { welcome }
                    <Welcome />
                    <PureWelcome />
                    <FunctionalWelcome />
                </ErrorBoundery>
                <StartComponent />
            </div>
        );
    }
}

export default App;