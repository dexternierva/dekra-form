import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import { CurrentUserProvider } from "./containers/CurrentUser";
import App from './App';
import './index.css';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#008A4C',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#F00E74',
    },
  },
});

ReactDOM.render(
	<React.StrictMode>
		<Router>
		<ThemeProvider theme={theme}>
			<CurrentUserProvider>
				<App />
			</CurrentUserProvider>
		</ThemeProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

