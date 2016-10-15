import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LeftNav from '../components/LeftNav';
import NavbarActions from '../containers/NavbarActions';
import VisibleStories from '../containers/VisibleStories';
import ManipulateStory from '../containers/ManipulateStory';
import FloatingActions from '../containers/FloatingActions';
import ConfirmRemoveStory from '../containers/ConfirmRemoveStory';
import ImportDialogActions from '../containers/ImportDialogActions';

export default function HomePage() {
	return (
		<MuiThemeProvider>
			<section>
				<NavbarActions />
				<section className="content">
					<VisibleStories />
				</section>
				<LeftNav />
				<ManipulateStory />
				<FloatingActions />
				<ConfirmRemoveStory />
				<ImportDialogActions />
			</section>
		</MuiThemeProvider>
	);
}
