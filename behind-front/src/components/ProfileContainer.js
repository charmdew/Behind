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
} from '@chakra-ui/react';
import { RiHeartsLine, RiHeartsFill } from 'react-icons/ri';
import { BiCommentDetail } from 'react-icons/bi';
import { ImProfile } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UsersStateContext, UsersDispatchContext } from '../App';

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
  showPhoneNum,
}) => {
  const token = getCookie('token');
  const LoginUserId = jwt_decode(token).sub;
  const navigate = useNavigate();

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
    <div>
      <Flex
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
        <Box
          border="solid 2px"
          borderColor="#4E6C50"
          ref={container}
          pt={7}
          w={{
            base: 'lg',
            lg: 'md',
          }}
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
                  profile={profile}
                  showPhoneNum={showPhoneNum}
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
    </div>
  );
};

ProfileContainer.defualtProps = {
  position: {},
};

export default React.memo(ProfileContainer);
