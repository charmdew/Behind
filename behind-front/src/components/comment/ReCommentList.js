import ReCommentListItem from './ReCommentListItem';
import { Box } from '@chakra-ui/react';
const ReCommentList = ({ replys }) => {
  return (
    <div>
      <Box>
        {replys.map(it => (
          <ReCommentListItem key={it.replyId} {...it} />
        ))}
      </Box>
    </div>
  );
};

export default ReCommentList;
