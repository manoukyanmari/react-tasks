import React, { Component } from 'react';

export class Welcome extends Component {
    render() {

        // The commented fields are for triggering the ErrorBoundery to work
        // const x = Math.random();
        // if (x > 0.7) {
            return (
                <h3 style={{
                    color: 'blue',
                }}>
                    Component with react-component
                </h3>
            );
        // }
        // throw new Error('hey');
    }
}