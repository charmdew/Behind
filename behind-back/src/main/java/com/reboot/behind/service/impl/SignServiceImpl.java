package com.reboot.behind.service.impl;

import com.reboot.behind.common.CommonResponse;
import com.reboot.behind.config.security.JwtTokenProvider;
import com.reboot.behind.data.dto.SignInRequestDto;
import com.reboot.behind.data.dto.SignInResultDto;
import com.reboot.behind.data.dto.SignUpRequestDto;
import com.reboot.behind.data.dto.SignUpResultDto;
import com.reboot.behind.data.entity.User;
import com.reboot.behind.data.repository.UserRepository;
import com.reboot.behind.service.SignService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;

@Service
public class SignServiceImpl implements SignService {

    private final Logger LOGGER = LoggerFactory.getLogger(SignService.class);

    public UserRepository userRepository;

    public JwtTokenProvider jwtTokenProvider;

    public PasswordEncoder passwordEncoder;

    @Autowired
    public SignServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SignUpResultDto signUp(SignUpRequestDto signUpRequestDto) {

        String id = signUpRequestDto.getId();
        String password = passwordEncoder.encode(signUpRequestDto.getPassword());
        String name = signUpRequestDto.getName();
        String role = "USER";
        String email = signUpRequestDto.getEmail();
        boolean front = signUpRequestDto.isFront();
        boolean back = signUpRequestDto.isBack();
        boolean embedded = signUpRequestDto.isEmbedded();
        List<String> tag = signUpRequestDto.getTag();
        String phoneNum = signUpRequestDto.getPhoneNum();
        boolean showPhoneNum = signUpRequestDto.isShowPhoneNum();
        boolean ai = signUpRequestDto.isAi();
        boolean iot = signUpRequestDto.isIot();
        boolean blockChain = signUpRequestDto.isBlockChain();
        boolean bigData = signUpRequestDto.isBigData();
        String detail = signUpRequestDto.getDetail();




        LOGGER.info("[getSignUpResult] 회원 가입 정보 전달");
        User user = User.builder()
                    .userId(id)
                    .password(password)
                    .name(name)
                    .role(role)
                    .email(email)
                    .front(front)
                    .back(back)
                    .embedded(embedded)
                    .tag(tag)
                    .phoneNum(phoneNum)
                    .showPhoneNum(showPhoneNum)
                    .ai(ai)
                    .iot(iot)
                    .blockChain(blockChain)
                    .bigData(bigData)
                    .detail(detail)
                    .build();

        User savedUser = userRepository.save(user);
        SignUpResultDto signUpResultDto = new SignUpResultDto();

        LOGGER.info("[getSignUpResult] userEntity 값이 들어왔는지 확인 후 결과값 주입");
        if(!savedUser.getUserId().isEmpty()){
            LOGGER.info("[getSignUpResult] 정상 처리 완료");
            setSuccessResult(signUpResultDto);
        }else {
            LOGGER.info("[getSignUpResult] 실패 처리 완료");
            setFailResult(signUpResultDto);
        }
        return signUpResultDto;
    }

    @Override
    public SignInResultDto signIn(SignInRequestDto signInRequestDto) throws RuntimeException {
        String id = signInRequestDto.getId();
        String password = signInRequestDto.getPassword();
        LOGGER.info("[getSignInResult] signDataHandler 로 회원 정보 요청");
        User user = userRepository.getUserByUserId(id);
        LOGGER.info("[getSignInResult] Id : {}",id);

        LOGGER.info("[getSignInResult] 패스워드 비교 수행");
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new RuntimeException();
        }
        LOGGER.info("[getSignInResult] 패스워드 일치");

        LOGGER.info("[getSignInResult] SignInResultDto 객체 생성");
        SignInResultDto signInResultDto = SignInResultDto.builder()
                .token(jwtTokenProvider.createToken(String.valueOf(user.getUserId()), user.getRole()))
                .build();

        LOGGER.info(("[getSignInResult] SignInResultDto 객체에 값 주입"));
        setSuccessResult(signInResultDto);

        return signInResultDto;
    }

    private void setSuccessResult(SignUpResultDto result){
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    private void setFailResult(SignUpResultDto result){
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }
}
