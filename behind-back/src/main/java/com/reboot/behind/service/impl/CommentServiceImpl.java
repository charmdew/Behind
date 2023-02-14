package com.reboot.behind.service.impl;

import com.reboot.behind.data.dto.Comment.*;
import com.reboot.behind.data.entity.Comment;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.CommentRepository;
import com.reboot.behind.data.repository.ReplyRepository;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(CommentRepository commentRepository,
                              ReplyRepository replyRepository){
        this.commentRepository = commentRepository;
        this.replyRepository = replyRepository;
    }
    @Autowired
    UserRepository userRepository;
    private final ReplyRepository replyRepository;

    @Override
    public List<CommentResponseDto> getCommentList(Integer id){
        User user = userRepository.findById(id).get();
        List<Comment> commentList = commentRepository.findAllByProfileUser(user);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();


        for(int i=0; i<commentList.size();i++){
            List<CommentResponseDto.replytmp> commentReplyList = new ArrayList<>();
            String updateTime = new String();

            for(int j=0; j<commentList.get(i).getReplies().size();j++) {
                CommentResponseDto.replytmp replytmp = new CommentResponseDto.replytmp();
                replytmp.setReplyId(commentList.get(i).getReplies().get(j).getReplyId());
                replytmp.setContent(commentList.get(i).getReplies().get(j).getContent());
                replytmp.setCreateTime(commentList.get(i).getReplies().get(j).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                if(commentList.get(i).getReplies().get(j).getUpdatedTime()!=null){
                    replytmp.setUpdateTime(commentList.get(i).getReplies().get(j).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                }
                else{
                    replytmp.setUpdateTime(null);
                }
                replytmp.setWriterName(commentList.get(i).getReplies().get(j).getWriterId().getName());
                replytmp.setWriterId(commentList.get(i).getReplies().get(j).getWriterId().getId());
                commentReplyList.add(replytmp);
            }
            if(commentList.get(i).getUpdatedTime()!=null){
                updateTime=commentList.get(i).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            }
            else{
                updateTime=null;
            }
            CommentResponseDto commentResponseDtos = CommentResponseDto.builder()
                    .id(commentList.get(i).getCommentId())
                    .content(commentList.get(i).getContent())
                    .writerId(commentList.get(i).getWriterUser().getId())
                    .writerName(commentList.get(i).getWriterUser().getName())
                    .createTime(commentList.get(i).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .updateTime(updateTime)
                    .replys(commentReplyList)
                    .build();

            commentResponseDtoList.add(commentResponseDtos);
        }
        return commentResponseDtoList;

    }

    @Override
    public CommentResponseDto saveComment(CommentDto commentDto){

        User user = userRepository.findById(commentDto.getWriterUser()).get();
        User profileUser = userRepository.findById(commentDto.getProfileUser()).get();
        List<CommentResponseDto.replytmp> commentReplyList = new ArrayList<>();

        Comment newcomment = Comment.builder()
                .writerUser(user)
                .profileUser(profileUser)
                .content(commentDto.getContent())
                .createdTime(LocalDateTime.now())
                .build();

        Comment saveComment = commentRepository.save(newcomment);

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .id(saveComment.getCommentId())
                .writerId(user.getId())
                .writerName(user.getName())
                .content(saveComment.getContent())
                .createTime(saveComment.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .replys(commentReplyList)
                .build();

        return commentResponseDto;

    }


    @Override
    public CommentResponseDto changeComment(Integer commentId,String content) {
        Comment foundComment = commentRepository.findById(commentId).get();
        User user = foundComment.getWriterUser();
        foundComment.setContent(content);
        foundComment.setUpdatedTime(LocalDateTime.now());

        Comment changedComment = commentRepository.save(foundComment);

        List<CommentResponseDto.replytmp> commentReplyList = new ArrayList<>();

        for (int j = 0; j < changedComment.getReplies().size(); j++) {
            CommentResponseDto.replytmp replytmp = new CommentResponseDto.replytmp();
            replytmp.setReplyId(changedComment.getReplies().get(j).getReplyId());
            replytmp.setContent(changedComment.getReplies().get(j).getContent());
            replytmp.setCreateTime(changedComment.getReplies().get(j).getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            if (changedComment.getReplies().get(j).getUpdatedTime() != null) {
                replytmp.setUpdateTime(changedComment.getReplies().get(j).getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            } else {
                replytmp.setUpdateTime(null);
            }
            replytmp.setWriterName(changedComment.getReplies().get(j).getWriterId().getName());
            replytmp.setWriterId(changedComment.getReplies().get(j).getWriterId().getId());
            commentReplyList.add(replytmp);
        }

        CommentResponseDto commentResponseDto = CommentResponseDto.builder()
                .id(changedComment.getCommentId())
                .writerId(user.getId())
                .writerName(user.getName())
                .content(changedComment.getContent())
                .createTime(changedComment.getCreatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updateTime(changedComment.getUpdatedTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .replys(commentReplyList)
                .build();

        return commentResponseDto;
    }

    @Override
    public void deleteComment(Integer id){
        Comment foundComment = commentRepository.findById(id).get();
        for(int i=0; i<foundComment.getReplies().size();i++){
            replyRepository.deleteById(foundComment.getReplies().get(i).getReplyId());
        }
        commentRepository.deleteById(id);
    }
}
