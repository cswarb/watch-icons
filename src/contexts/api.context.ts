import React from 'react';

export const API_TOKEN = {
    protocol: 'http',
    host: 'localhost',
    port: '3030',
    url: function() {
        return `${this.protocol}://${this.host}:${this.port}`
    }
}

const ApiContext = React.createContext(API_TOKEN);
