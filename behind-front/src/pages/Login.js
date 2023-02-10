import { Box, Button, VStack } from '@chakra-ui/react';

const Login = () => {
  return (
    <Box>
      <VStack>
        <Button>
          <a href="http://ec2-13-209-17-196.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao">
            Kakao Login
          </a>
        </Button>
        <Button>Goolge Login</Button>
      </VStack>
    </Box>
  );
};

export default Login;
