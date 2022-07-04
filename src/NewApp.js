import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Create from './pages/Create';
import Layout from './pages/Layout';
import Notes from './pages/Notes';
import { createTheme, ThemeProvider } from '@material-ui/core';
import { purple } from '@material-ui/core/colors'

export default function App(){

	const customTheme = createTheme({
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

	return(
		<ThemeProvider theme={customTheme}>
		<BrowserRouter>
			<Routes>
				<Route path='/' element = {<Layout/>} > 	{/* shared layout */}
					{/* nested routes */}
					<Route index element={<Notes/>}/>
					<Route path='/create' element = {<Create edit = {false}/>}/>
					<Route path='/create/:noteId' element= {<Create edit = {true}/>}/>
					
				</Route>	

			</Routes>
		</BrowserRouter>
		</ThemeProvider>
	)
}