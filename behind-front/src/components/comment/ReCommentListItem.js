import { Box } from '@chakra-ui/react';
const ReCommentListItem = () => {
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
      </Box>
    </div>
  );
};

export default ReCommentListItem;
