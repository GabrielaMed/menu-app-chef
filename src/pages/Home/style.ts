import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Tab = styled.div`
  width: 100%;
  background-color: #e6e5e5;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const ChosenTab = styled.button<{ active: boolean }>`
  all: unset;
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  color: ${({ active }) => (active ? '#4B2995' : '#C4C4C4')};

  &:not(:last-child) {
    border-right: 1px solid white;
  }
`;
