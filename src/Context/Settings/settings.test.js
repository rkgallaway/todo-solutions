import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SettingsProvider, { SettingsContext } from './';


describe('Settings context', () => {

  // unit test: proves ONLY that the state can provide info to its consumers
  test('provides initial state', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ completed, pageItems, sort, save }) => (
            <>
            <h1>SettingsProvider Initial State</h1>
            <ul>
              <li data-testid="completed">{completed.toString()}</li>
              <li data-testid="pageItems">{pageItems}</li>
              <li data-testid="sort">{sort}</li>
              <li data-testid="save">{save.toString()}</li>
            </ul>
            </>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const completedLi = screen.getByTestId('completed');
    const pageItemsLi = screen.getByTestId('pageItems');
    const sortLi = screen.getByTestId('sort');
    const saveLi = screen.getByTestId('save');



    expect(completedLi).toHaveTextContent(false);
    expect(pageItemsLi).toHaveTextContent(3);
    expect(sortLi).toHaveTextContent('difficulty');
    expect(saveLi).toHaveTextContent(false);
  });

  test('provides changed state', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {({ completed, pageItems, sort, save, showCompleted, changeItems, sortBy, storeSettings }) => (
            <>
            <h1>SettingsProvider Initial State</h1>
            <ul>
              <li onClick={showCompleted} data-testid="completed">{completed.toString()}</li>
              <li onClick={() => changeItems(42)} data-testid="pageItems">{pageItems}</li>
              <li onClick={() => sortBy('test')} data-testid="sort">{sort}</li>
              <li onClick={storeSettings} data-testid="save">{save.toString()}</li>
            </ul>
            </>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    const completedLi = screen.getByTestId('completed');
    const pageItemsLi = screen.getByTestId('pageItems');
    const sortLi = screen.getByTestId('sort');
    const saveLi = screen.getByTestId('save');

    fireEvent.click(completedLi);
    fireEvent.click(pageItemsLi);
    fireEvent.click(sortLi);
    fireEvent.click(saveLi)
    
    expect(completedLi).toHaveTextContent(true);
    expect(pageItemsLi).toHaveTextContent(42);
    expect(sortLi).toHaveTextContent('test');
    expect(saveLi).toHaveTextContent(true);
  });
});
