import CommentList from './CommentList';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  IconButton,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';

import { FiArrowLeft } from 'react-icons/fi';

const Comment = () => {
  return (
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
      <Box
        borderBottom="0.5px solid"
        borderColor="blackAlpha.300"
        h="93%"
        overflow="auto"
      >
        <CommentList />
      </Box>

      <InputGroup borderColor="unset" size="md">
        <Input
          _focusVisible={false}
          borderColor="white"
          fontSize={13}
          pr="4.5rem"
          placeholder="댓글을 입력주세요"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm">
            Enter
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Comment;
