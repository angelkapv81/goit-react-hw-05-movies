import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 2rem;
`;

export const Form = styled.form`
  display: flex;
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

export const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;
