import { Image, Box, Icon, Text, Button } from '@chakra-ui/react';
import { BsPhone } from 'react-icons/bs';
import { FiAtSign } from 'react-icons/fi';
import React, { useState } from 'react';

const MyProfileCard = ({ phoneNum, tag, email, name, images, profile }) => {
  // 포토 카드 실물 사이즈 : ( 54*86 )mm

  const profileSrc = `https://d2p3k144i3awma.cloudfront.net//${profile}`;
  const altSrc =
    'https://via.placeholder.com/322x400/FEEBC8/000000.png?text=Come+to+take+pictures';

  const [colorToggle, setColorToggle] = useState(false);
  const tags = () => {
    let temp = '#';
    temp = temp + tag.join(' #');
    return temp;
  };

  if (colorToggle) {
    return (
      <div>
        {/* <Button onClick={() => setColorToggle(!colorToggle)} /> */}

        <Box
          display="flex"
          flexDirection="column"
          border="0.5px solid"
          borderColor="blackAlpha.300"
          borderRadius="2xl"
          w={324}
          h={516}
          overflow="hidden"
        >
          {/* <Image
            w="full"
            h={400}
            fit="cover"
            objectPosition="center"
            // 프로필 카드 이미지 자리
            // src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
            src="https://picsum.photos/200/300"
            alt="avatar"
          /> */}
          <Box pb={2} pl={4} display="flex" flexDirection="column" flex="1">
            <Box display="flex" flexGrow="3">
              <Box
                fontSize={25}
                fontWeight="extrabold"
                pt={1}
                mr={3}
                display="flex"
                alignItems="center"
              >
                {name}
              </Box>
              <Box
                pt={2}
                color="blackAlpha.600"
                display="flex"
                alignItems="center"
              >
                {tags()}
              </Box>
            </Box>

            <Box
              display="flex"
              pl={2}
              fontSize={14}
              flexGrow="1"
              alignContent="center"
              pt={0}
            >
              <Box pt={1}>
                <Icon as={FiAtSign} boxSize={4} />
              </Box>
              <Text pt={0.7} pl={2} fontStyle="italic" fontWeight="semibold">
                {email}
              </Text>
            </Box>
            <Box
              display="flex"
              pl={2}
              fontSize={14}
              flexGrow="1"
              alignContent="center"
            >
              <Box pt={1}>
                <Icon as={BsPhone} boxSize={4} />
              </Box>

              <Text pt={0.7} pl={2} fontStyle="italic" fontWeight="semibold">
                {phoneNum}
              </Text>
            </Box>
          </Box>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        {/* <Button onClick={() => setColorToggle(!colorToggle)} /> */}
        <Box
          display="flex"
          flexDirection="column"
          border="0.5px solid"
          borderColor="blackAlpha.300"
          borderRadius="2xl"
          w={324}
          h={516}
          overflow="hidden"
        >
          <Image
            w="full"
            h={400}
            fit="cover"
            objectPosition="center"
            src={profileSrc}
            fallbackSrc={altSrc}
          />
          <Box
            backgroundColor="black"
            pb={2}
            pl={4}
            display="flex"
            flexDirection="column"
            flex="1"
          >
            <Box display="flex" flexGrow="3">
              <Box
                fontSize={25}
                fontWeight="extrabold"
                pt={1}
                mr={3}
                display="flex"
                alignItems="center"
                color="gray.200"
              >
                {name}
              </Box>
              <Box pt={2} color="gray.500" display="flex" alignItems="center">
                {tags()}
              </Box>
            </Box>

            <Box
              display="flex"
              pl={2}
              fontSize={14}
              flexGrow="1"
              alignContent="center"
              pt={0}
            >
              <Box pt={1}>
                <Icon as={FiAtSign} boxSize={4} color="gray.300" />
              </Box>
              <Text
                color="gray.300"
                pt={0.7}
                pl={2}
                fontStyle="italic"
                fontWeight="semibold"
              >
                {email}
              </Text>
            </Box>
            <Box
              display="flex"
              pl={2}
              fontSize={14}
              flexGrow="1"
              alignContent="center"
            >
              <Box pt={1}>
                <Icon as={BsPhone} boxSize={4} color="gray.300" />
              </Box>

              <Text
                color="gray.300"
                pt={0.7}
                pl={2}
                fontStyle="italic"
                fontWeight="semibold"
              >
                {phoneNum}
              </Text>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
};

export default React.memo(MyProfileCard);
