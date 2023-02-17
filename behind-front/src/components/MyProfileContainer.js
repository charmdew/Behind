import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Image,
  chakra,
  Container,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { RiHeartsLine, RiHeartsFill } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsersStateContext, UsersDispatchContext } from '../App';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

import ProfileCard from './ProfileCard';
import Comment from './comment/Comment';
// 인자에 사용하고 싶은 유저 property를 가져와서 사용!

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

const ProfileContainer = ({
  position,
  id,
  likeCnt,
  phoneNum,
  tag,
  email,
  name,
  track,
  images,
  profile,
}) => {
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;
  const navigate = useNavigate();
  const it = 'https://behind-pic.s3.ap-northeast-2.amazonaws.com/';

  // 프로필 이미지
  const [profileImg, setProfileImg] = useState(profile);
  // 프로필 이미지 수정 토글
  const [imgToggle, setImgToggle] = useState(false);
  const toggleChange = () => {
    setImgToggle(pre => {
      return !pre;
    });
  };

  const [followingIdList, setfollowingIdList] = useState([]);

  const updateFollowingIdList = () => {
    axios({
      url: `https://i8a404.p.ssafy.io/api/users/${LoginUserId}`,
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
    })
      .then(response => {
        setfollowingIdList(response.data.followingUsers);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      });
  };

  useEffect(() => {
    updateFollowingIdList();
  }, []);

  // 내 프로필 클릭하면 mypage로 보내는 기능
  const goDetail = () => {
    if (parseInt(LoginUserId) === parseInt(id)) {
      return navigate('/mypage');
    } else {
      return navigate(`/detail/${id}`);
    }
  };

  // 선호 포지션, 전공 | 비전공 추출
  const getPreferPosition = () => {
    const positionList = Object.keys(position);
    let temp = [];
    positionList.forEach(element => {
      if (position[element] === true) {
        switch (element) {
          case 'frontend':
            temp.push('FrontEnd');
            break;
          case 'backend':
            temp.push('BackEnd');
            break;
          case 'embedded':
            temp.push('Embedded');
            break;
          default:
            console.log('포지션에서 특정 못함');
        }
      }
    });
    return temp;
  };

  const changeProfileImg = imgUrl => {
    axios({
      url: 'https://i8a404.p.ssafy.io/api/users/images',
      method: 'patch',
      headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
      params: {
        id: parseInt(LoginUserId),
        image: imgUrl,
      },
    })
      .then(res => {
        setProfileImg(imgUrl);
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log(error);
      });
  };

  const getPreferTrack = () => {
    const TrackList = Object.keys(track);
    let temp = [];
    TrackList.forEach(element => {
      if (track[element] === true) {
        switch (element) {
          case 'major':
            temp.push('전공');
            break;
          case 'nonMajor':
            temp.push('비전공');
            break;
          // case 'bigdata':
          //   temp.push('BigData');
          //   break;
          // case 'blockchain':
          //   temp.push('BlockChain');
          //   break;
          // case 'metaverse':
          //   temp.push('metaverse');
          //   break;
          default:
            console.log('트랙에서 특정못함');
        }
      }
    });
    return temp;
  };

  // 댓글창 on/off
  const [commentToggle, setCommentToggle] = useState(false);

  // 좋아요 아이콘 토글
  const defaultLikeIcon = followingIdList.includes(id);
  const [likeToggle, setLikeToggle] = useState(defaultLikeIcon);
  useEffect(() => {
    const TF = followingIdList.includes(id);
    setLikeToggle(TF);
  }, [followingIdList]);

  // 좋아요 카운트
  const [likeCount, setLikeCount] = useState(likeCnt);

  // 좋아요 기능
  const following = () => {
    // 좋아요 취소
    if (likeToggle) {
      axios({
        method: 'delete',
        url: 'https://i8a404.p.ssafy.io/api/users/like',
        headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
        data: {
          followUser: String(id),
          user: parseInt(LoginUserId),
        },
      }).then(res => {
        setLikeCount(res.data.newLikeCnt);
        setLikeToggle(false);
      });
    }
    // 좋아요 추가
    else {
      axios({
        method: 'post',
        url: 'https://i8a404.p.ssafy.io/api/users/like',
        headers: { 'Content-Type': 'application/json', 'X-AUTH-TOKEN': token },
        data: {
          followUser: parseInt(id),
          user: parseInt(LoginUserId),
        },
      }).then(res => {
        setLikeCount(res.data.newLikeCnt);
        setLikeToggle(true);
      });
    }
  };

  // mouseOver CSS
  const container = useRef();
  const buttonA = useRef();
  const buttonB = useRef();
  const onHover = () => {
    container.current.style.backgroundColor = '#E2E8F0';
    buttonA.current.style.backgroundColor = '#E2E8F0';
    buttonB.current.style.backgroundColor = '#E2E8F0';
  };

  const offHover = () => {
    container.current.style.backgroundColor = 'white';
    buttonA.current.style.backgroundColor = 'white';
    buttonB.current.style.backgroundColor = 'white';
  };

  const buttonAonHover = e => {
    buttonA.current.style.backgroundColor = '#E2E8F0';
  };
  const buttonBonHover = e => {
    buttonB.current.style.backgroundColor = '#E2E8F0';
  };
  const buttonAoffHover = e => {
    buttonA.current.style.backgroundColor = 'white';
  };
  const buttonBoffHover = e => {
    buttonB.current.style.backgroundColor = 'white';
  };

  // 렌더링
  return (
    <Flex
      direction="column"
      bg="white"
      _dark={{ bg: '#3e3e3e' }}
      pt={{
        base: '5',
        lg: '50',
      }}
      px={{
        base: '1vw',
        lg: '5vw',
      }}
      alignItems="center"
      justifyContent="center"
    >
      {/* 프로필 사진 수정
        사진 주소 리스트로 받으면 map으로 먹히는지 실험 */}
      {/* 사진 클릭하면 onClick 이벤트 실행해서 프로필 사진 수정 요청 보내기 */}
      {/* 프로필 사진 useState저장해서 수정요청 보내는 동시에 state 수정하는거 실험해보자 */}
      {/* 되면 사진 수정버튼으로 토글 조정해서 화면 전환 */}
      {/* <Button onClick={toggleChange}>Profile 이미지 수정</Button> */}
      <Box
        w={{
          base: '90vw',
          lg: 'md',
        }}
        display="flex"
        justifyContent="end"
        mb="5px"
      >
        {imgToggle ? (
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              fontWeight="semibold"
              fontStyle="italic"
              ml="10px"
              fontSize={{
                base: 'sm',
                lg: 'md',
              }}
            >
              사진을 클릭 후 Done을 눌러주세요
            </Box>
            <Button size="sm" onClick={toggleChange}>
              Done
            </Button>
          </Box>
        ) : (
          <Button size="sm" onClick={toggleChange}>
            Change photo
          </Button>
        )}
      </Box>

      {imgToggle ? (
        <Box
          w={{
            base: '90vw',
            lg: 'md',
          }}
          border="solid 2px"
          borderColor="#4E6C50"
          pt={7}
          pb={7}
          mb={50}
          mx="auto"
          h="fit-content"
          bg="white"
          _dark={{ bg: 'gray.800' }}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
          boxShadow="xl"
        >
          <div className="wrapper">
            <Splide
              options={{
                perPage: 1,
                rewind: true,
                gap: '1rem',
              }}
              aria-labelledby="basic-example-heading"
              onMoved={(splide, newIndex) => {
                // eslint-disable-next-line
                // console.log('moved', newIndex);
                // eslint-disable-next-line
                // console.log('length', splide.length);
              }}
            >
              {images.map(it => (
                <SplideSlide display="flex" key={it}>
                  <Image
                    margin="auto"
                    onClick={() => {
                      changeProfileImg(it);
                    }}
                    src={'https://d2p3k144i3awma.cloudfront.net/' + it}
                  />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </Box>
      ) : (
        <></>
      )}

      <Box
        border="solid 2px"
        borderColor="#4E6C50"
        ref={container}
        pt={7}
        w={{
          base: '90vw',
          lg: 'md',
        }}
        // mx="auto"
        bg="white"
        _dark={{ bg: 'gray.800' }}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
        boxShadow="xl"
      >
        {/* userId를 파라미터로 하는 detail/{id} 페이지로 이동 */}
        {/* 이 이미지 자리에 프로필 카드 컴포넌트가 들어가면 됨 */}
        {/* <Box w="full">하하</Box> */}

        <Box display="flex" justifyContent="center">
          {commentToggle ? (
            <Comment profileUserId={id} />
          ) : (
            <Box
              onClick={goDetail}
              cursor="pointer"
              onMouseOver={onHover}
              onMouseOut={offHover}
            >
              <ProfileCard
                phoneNum={phoneNum}
                tag={tag}
                email={email}
                name={name}
                images={images}
                profile={profileImg}
              />
            </Box>
          )}
        </Box>

        {/* 정보 % 버튼 */}
        <Box display="flex" justifyContent="space-between">
          {/* 정보*/}
          <Box
            h={160}
            py={6}
            px={6}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {/* 선호 포지션 */}
            <Box>
              <Flex
                alignItems="center"
                color="gray.700"
                _dark={{ color: 'gray.200' }}
              >
                <chakra.h1 fontSize="sm">선호 포지션</chakra.h1>
              </Flex>
              <chakra.h1
                fontSize="lg"
                fontWeight="bold"
                color="gray.800"
                _dark={{ color: 'white' }}
              >
                <Container p={0}>{getPreferPosition().join(' / ')}</Container>
              </chakra.h1>
            </Box>

            {/* 전공 | 비전공 */}
            <Box>
              <Flex
                alignItems="center"
                color="gray.700"
                _dark={{ color: 'gray.200' }}
              >
                <chakra.h1 fontSize="sm">전공 | 비전공</chakra.h1>
              </Flex>
              <chakra.h1
                fontSize="lg"
                fontWeight="bold"
                color="gray.800"
                _dark={{ color: 'white' }}
              >
                <Container p={0}>{getPreferTrack().join(' / ')}</Container>
              </chakra.h1>
            </Box>
          </Box>
          {/* 버튼 */}
          <Box
            h={160}
            py={6}
            px={6}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {/* 좋아요 */}
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                ref={buttonA}
                onMouseOver={buttonAonHover}
                onMouseOut={buttonAoffHover}
                backgroundColor="white"
                aria-label="Call Sage"
                fontSize="30px"
                icon={
                  parseInt(id) !== parseInt(LoginUserId) ? (
                    likeToggle ? (
                      <Box>
                        <RiHeartsFill onClick={following} />
                      </Box>
                    ) : (
                      <Box>
                        <RiHeartsLine onClick={following} />
                      </Box>
                    )
                  ) : (
                    <RiHeartsFill />
                  )
                }
              />
              <Box display="flex" alignItems="center" pr="1" fontSize="23">
                {likeCount === 0 ? '' : likeCount}
              </Box>
            </Box>
            {/* 댓글창 */}
            <Box display="flex" flexDirection="row-reverse">
              <IconButton
                ref={buttonB}
                onMouseOver={buttonBonHover}
                onMouseOut={buttonBoffHover}
                backgroundColor="white"
                aria-label="Call Sage"
                fontSize="30px"
                icon={commentToggle ? <ImProfile /> : <BiCommentDetail />}
                onClick={() => setCommentToggle(!commentToggle)}
              />
              <Box
                display="flex"
                alignItems="center"
                pr="1"
                fontSize="23"
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

ProfileContainer.defualtProps = {
  position: {},
};

export default React.memo(ProfileContainer);
