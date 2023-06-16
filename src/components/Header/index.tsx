import { Container, Title } from './style';

interface Props {
  pageName: string;
}
export const Header = ({ pageName }: Props) => {
  return (
    <Container>
      <Title>{pageName}</Title>
    </Container>
  );
};
