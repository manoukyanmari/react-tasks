import React, { PureComponent } from 'react';
import { DumpComponent } from '../components/dump.component';

export class StartComponent extends PureComponent {
    render() {
        return  <DumpComponent text='You are a stupid button'/>;
    }
}