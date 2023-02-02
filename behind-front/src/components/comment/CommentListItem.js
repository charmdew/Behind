import ReCommentList from './ReCommentList';

// 대댓글 열기 버튼
// chakra - Collapse transition

import {
  Box,
  IconButton,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';

const CommentListItem = () => {
  return (
    <Box
      p={2}
      pl={3}
      pr={3}
      borderBottom="0.5px solid"
      borderColor="blackAlpha.300"
      backgroundColor="gray.100"
    >
      {/* 작성자, 작성시간, 댓글 내용 */}
      <Box mb="2">
        {/* 작성자, 작성시간 */}
        <Box display="flex" mb={1}>
          {/* 작성자 */}
          <Box fontSize="sm" mr={2} fontWeight="bold">
            유정훈
          </Box>
          {/* 작성시간 */}
          <Box
            display="flex"
            flexDirection="column-reverse"
            fontSize="2xs"
            color="gray.500"
            fontStyle="italic"
          >
            (작성시간)
          </Box>
        </Box>
        {/* 댓글 */}
        <Box fontSize="small">댓글 내용</Box>
      </Box>

      {/* 대댓글, 대댓글 달기 */}
      <Box>
        {/* 대댓글 */}
        <Box mt={1} ml={3}>
          <ReCommentList />
        </Box>
        {/* 대댓글 달기 */}
        <Box>
          <InputGroup backgroundColor="white" size="xs" borderRadius={5}>
            <Input fontSize={11} pr="4.5rem" placeholder="댓글을 입력주세요" />
            <InputRightElement width="4.5rem">
              <Button h="1rem" size="xs">
                Enter
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  );
};

export default CommentListItem;
