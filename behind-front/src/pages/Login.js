import { Box, VStack, Image } from '@chakra-ui/react';
const Login = () => {
  return (
    <Box h="100vw" bg="yellow.50">
      <VStack>
        <a
          mt="10"
          href="https://i8a404.p.ssafy.io/api/oauth2/authorization/kakao"
        >
          <Image
            // w="70vw"
            w={{
              base: '60vw',
              lg: '300px',
            }}
            mt="10"
            src="images/kakao_login_large_narrow.png"
            borderRadius="12"
            shadow="md"
          ></Image>
        </a>
        <a
          mt="10"
          href="https://i8a404.p.ssafy.io/api/oauth2/authorization/google"
        >
          <Image
            w={{
              base: '62vw',
              lg: '305px',
            }}
            mt="2"
            src="images/btn_google_signin_light_normal_web@2x.png"
          ></Image>
        </a>
      </VStack>
    </Box>
  );
};

export default Login;
