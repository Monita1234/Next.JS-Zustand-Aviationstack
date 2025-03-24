import React from 'react';
import { render } from '@testing-library/react';
import AirportMap from '@/app/components/AirportMap';
describe('AirportMap component', () => {
  it('renders without crashing', () => {
    render(<AirportMap latitude="0" longitude="0" />);
  });
});
