import { Box, styled } from '@mui/material';
import Chart from '../components/common/Chart';

const Display = () => {
  return (
    <Container>
      <Chart />
    </Container>
  );
};

export default Display;

const Container = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
