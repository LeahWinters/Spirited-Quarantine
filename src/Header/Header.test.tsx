import React from 'react';
import Header from './Header';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('Should only display the title of the application when user is not logged in', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={false} 
          setLoggedIn={false}
          setUsername={''}
        />
      </MemoryRouter>
    );

    const title = getByText('Spirited Quarantini');

    expect(title).toBeInTheDocument();
  });

  it('Should display the title, a search bar, and multiple buttons when a user is logged in', () => {
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={Function}
          setUsername={''}
        />
      </MemoryRouter>
    );

    const title = getByText('Spirited Quarantini');
    const searchBar = getByPlaceholderText('search cocktails...');
    const aboutBtn = getByText('About');
    const cocktailsBtn = getByText('Cocktails');
    const myCocktailsBtn = getByText('My Cocktails');
    const logoutBtn = getByText('Logout');

    expect(title).toBeInTheDocument();
    expect(searchBar).toBeInTheDocument();
    expect(aboutBtn).toBeInTheDocument();
    expect(cocktailsBtn).toBeInTheDocument();
    expect(myCocktailsBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });


  // Currently failing because we need to pass in the function that will be later called when clicking the search btn, that function will then be mocked instead of the mock fn I have written below
  it.skip('User should be able to search cocktails when logged in', () => {
    const mockSearch = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <Header 
          loggedIn={true} 
          setLoggedIn={Function}
          setUsername={''}
          // passed in function that will be used to mock
        />
      </MemoryRouter>
    );

    const searchInput = getByPlaceholderText('search cocktails...')
    const searchBtn = getByText('About');

    fireEvent.change(searchInput);
    fireEvent.click(searchBtn);

    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
})