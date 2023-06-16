import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  cursor: pointer;
  padding: 1rem;
  background-color: #ebe5f9;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 6px 44px;
`;

export const ChangeOrderStatusButton = styled.button`
  all: unset;
  width: 100%;
  height: 2rem;
  color: white;
  background-color: #4b2995;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-inline: 1rem;
`;
