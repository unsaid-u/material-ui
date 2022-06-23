import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import Layout from './pages/Layout'


// creating custom theme
const theme = createTheme({	// here I can override the default theme object 
	palette: {
		primary : {
			main : "#000000"
		},

		secondary : purple			// purple is a name of a color object
	},

	typography :{
		fontFamily : 'Quicksand',
		fontWeightLight : 400,
		fontWeightRegular : 500,
		fontWeightMedium : 600,
		fontWeightBold : 700
	}
})

function App() {

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Layout>
					<Switch>
						<Route exact path="/">
							<Notes />
						</Route>
						<Route path="/create">
							<Create />
						</Route>
					</Switch>
				</Layout>
			</Router>
		</ThemeProvider>
	);
}

export default App;
