import ScrollToTop from 'components/Common/ScrollToTop';
import { WindowStatusProvider } from 'components/Context/WindowStatusContext';
import { Router } from 'components/Router';
import {
  ModalMain,
  ModalProvider,
} from 'halfz/react-simple-modal';
import ModalContainer from 'halfz/react-simple-modal/ModalContainer';
import 'highlight.js/styles/tomorrow-night.css';
import React, { Suspense } from 'react';
import {
  Root,
  Routes,
} from 'react-static';
import { LocationProvider } from 'utils/useLocation';
import '../data/post/resource';
import '../data/author/resource';
import './app.css';
import './generated/fonts.css';

function App() {
  return (
    <LocationProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ModalProvider>
          <WindowStatusProvider>
            <ModalMain>
              <ScrollToTop>
                <Root>
                  <Router>
                    <Routes path="*" />
                  </Router>
                </Root>
              </ScrollToTop>
            </ModalMain>
            <ModalContainer />
          </WindowStatusProvider>
        </ModalProvider>
      </Suspense>
    </LocationProvider>
  );
}

export default App;
