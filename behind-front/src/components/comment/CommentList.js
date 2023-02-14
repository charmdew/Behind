import CommentListItem from './CommentListItem';

import { Box } from '@chakra-ui/react';

const CommentList = ({ commentList }) => {
  return (
    <Box>
      {commentList.map(it => (
        <CommentListItem key={it.commentId} {...it} />
      ))}
    </Box>
  );
};

export default CommentList;
