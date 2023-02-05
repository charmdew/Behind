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
import { useRef, useContext } from 'react';
import { UsersStateContext } from '../../App';
import axios from 'axios';
import { CommentDispatchContext } from './Comment';
const CommentListItem = it => {
  const { loginUser } = useContext(UsersStateContext);
  const inputContent = useRef();
  const { getCommentList } = useContext(CommentDispatchContext);
  console.log(it);
  // const timeNow = new Date(new Date().getTime() + 1000 * 60 * 60 * 9)
  //   .toISOString()
  //   .replace('T', ' ')
  //   .split('.')[0];

  const replySave = e => {
    e.preventDefault();
    //추가 데이터
    const newReply = {
      writerId: parseInt(loginUser.id),
      content: e.target[0].value,
      commentId: parseInt(it.commentId),
    };
    axios({
      url: 'api/reply',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...newReply,
      },
    })
      .then(() => {
        inputContent.current.value = '';
        getCommentList();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteComment = () => {};

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
            {it.writerName}
          </Box>
          {/* 작성시간 */}
          <Box
            display="flex"
            flexDirection="column-reverse"
            fontSize="2xs"
            color="gray.500"
            fontStyle="italic"
          >
            {it.createTime}
          </Box>
          {/* 삭제, 수정 버튼 */}

          <Box>
            <Button onClick={deleteComment}>삭제</Button>
          </Box>
          <Box>
            <Button onClick={deleteComment}>수정</Button>
          </Box>
        </Box>
        {/* 댓글 */}
        <Box fontSize="small">{it.content}</Box>
      </Box>

      {/* 대댓글, 대댓글 달기 */}
      <Box>
        {/* 대댓글 */}
        <Box mt={1} ml={3}>
          <ReCommentList replys={it.replys} />
        </Box>
        {/* 대댓글 달기 */}
        <Box as="form" onSubmit={replySave}>
          <InputGroup backgroundColor="white" size="xs" borderRadius={5}>
            <Input
              ref={inputContent}
              fontSize={11}
              pr="4.5rem"
              placeholder="댓글을 입력주세요"
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" h="1rem" size="xs">
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
