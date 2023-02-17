import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRef, useContext, useState } from 'react';

import {
  Box,
  IconButton,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  Editable,
  EditableInput,
  EditableTextarea,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  Flex,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { UsersStateContext } from '../../App';
import { CommentDispatchContext } from './Comment';

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

const ReCommentListItem = it => {
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;
  const { getCommentList } = useContext(CommentDispatchContext);

  const [thisReply, setThisReply] = useState(it.content);
  const thisReplyHandleChange = e => {
    setThisReply(e);
  };

  const editReply = () => {
    axios({
      url: 'https://i8a404.p.ssafy.io/api/reply',
      method: 'patch',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      data: {
        replyId: parseInt(it.replyId),
        content: thisReply,
        writerUser: parseInt(LoginUserId),
      },
    })
      .then(() => {
        getCommentList();
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      });
  };

  const deleteReply = () => {
    axios({
      method: 'delete',
      url: 'https://i8a404.p.ssafy.io/api/reply',
      params: {
        id: it.replyId,
        writerUser: parseInt(LoginUserId),
      },
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    }).then(() => {
      getCommentList();
    });
  };

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup alignItems="center" justifyContent="center" size="sm">
        <Box onClick={editReply}>
          <IconButton
            size="xs"
            icon={<CheckIcon />}
            {...getSubmitButtonProps()}
          />
        </Box>

        <IconButton
          size="xs"
          icon={<CloseIcon />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <div>
      <Box
        mb={2}
        fontSize="small"
        borderLeft=" 1px solid"
        borderColor="gray.400"
        pl={1}
      >
        {/* 작성자, 작성시간, 댓글 내용 */}
        <Box>
          {/* 작성자, 작성시간, 삭제버튼 */}
          <Box display="flex" justifyContent="space-between">
            {/* 작성자, 작성시간 */}
            <Box display="flex" alignItems="center">
              {/* 작성자 */}
              <Box
                display="flex"
                flexDirection="column-reverse"
                fontSize="sm"
                mr={2}
                fontWeight="bold"
              >
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
                {it.updateTime ? `${it.updateTime} (수정됨)` : it.createTime}
              </Box>
            </Box>
            {/* 삭제 버튼 */}
            <Box display="flex" flexDirection="column-reverse">
              {parseInt(LoginUserId) === it.writerId ? (
                <IconButton
                  size="sm"
                  onClick={deleteReply}
                  icon={<DeleteIcon />}
                />
              ) : (
                <></>
              )}
            </Box>
          </Box>
          {/* 댓글 */}
          <Editable
            display="flex"
            justifyContent="space-between"
            textAlign="start"
            defaultValue={it.content}
            fontSize="sm"
            isPreviewFocusable={false}
            onChange={thisReplyHandleChange}
          >
            <EditablePreview />
            {/* Here is the custom input */}
            <Input height="8" fontSize="sm" as={EditableInput} />

            {parseInt(LoginUserId) === it.writerId ? (
              <EditableControls />
            ) : (
              <></>
            )}
          </Editable>
        </Box>
      </Box>
    </div>
  );
};

export default ReCommentListItem;
