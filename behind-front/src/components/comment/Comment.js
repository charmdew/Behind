import axios from 'axios';
import jwt_decode from 'jwt-decode';
import CommentList from './CommentList';

import {
  Box,
  Input,
  InputRightElement,
  Button,
  InputGroup,
} from '@chakra-ui/react';
import React, { useContext, useState, useEffect, useRef, useMemo } from 'react';
import { UsersStateContext } from '../../App';

export const CommentDispatchContext = React.createContext();

function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookie_name) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

const Comment = ({ profileUserId }) => {
  const inputContent = useRef();
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;

  const [commentList, setCommentList] = useState([]);

  const getCommentList = async () => {
    await axios({
      method: 'get',
      url: `https://i8a404.p.ssafy.io/api/comment?id=${profileUserId}`,
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    }).then(res => {
      setCommentList(res.data);
    });
  };
  useEffect(() => {
    getCommentList();
  }, []);

  const commentSave = e => {
    e.preventDefault();
    //추가 데이터
    const newComment = {
      writerUser: parseInt(LoginUserId),
      profileUser: parseInt(profileUserId),
      content: e.target[0].value,
    };
    axios({
      url: 'https://i8a404.p.ssafy.io/api/comment',
      method: 'post',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      data: {
        ...newComment,
      },
    })
      .then(res => {
        setCommentList([...commentList, res.data]);
        inputContent.current.value = '';
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const memoizedCommentDispatches = useMemo(() => {
    return { getCommentList };
  }, []);

  return (
    <CommentDispatchContext.Provider value={memoizedCommentDispatches}>
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
          <CommentList commentList={commentList} />
        </Box>

        <Box as="form" onSubmit={commentSave}>
          <InputGroup borderColor="unset" size="md">
            <Input
              ref={inputContent}
              _focusVisible={false}
              borderColor="white"
              fontSize={13}
              pr="4.5rem"
              placeholder="댓글을 입력주세요"
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" h="1.75rem" size="sm">
                Enter
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </CommentDispatchContext.Provider>
  );
};

export default Comment;
